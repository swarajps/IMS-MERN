const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionManager = require('../managers/sessionManager');
const checkAuth = require('../managers/auth');
const multer = require('multer');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const htmlPdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const Course = require('../models/course');
const Login = require('../models/login');
const Mentor = require('../models/mentor');
const Intern = require('../models/intern');
const Allocation = require('../models/allocation');
const CourseAllocation = require('../models/allocatedcourses');
const Work = require('../models/work');
const AssignWork = require('../models/assignwork');
const AllocatedCourse = require('../models/allocatedcourses');
const WorkReport = require('../models/workreport');
const WorkEvaluation = require('../models/workreport');
const Queries = require('../models/queryandreply');
const Generatereport  = require("../models/generatedreport");
const { exec } = require('child_process');

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
const generateTimestamp = () => {
    const ts = Date.now();
    const seconds = new Date().getSeconds();
    const milliseconds = new Date().getMilliseconds();
    return `${ts}-${seconds}-${milliseconds}`;
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = 'uploads/';

        if (file.mimetype.startsWith('image/')){
            uploadDir += 'images/';
        }
        else {
            uploadDir += 'documents/';
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        if (!req) {
            return;
        }
        const dt = generateTimestamp();
        req.dt = dt;
        cb(null, file.fieldname + '-' + dt + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



//Profile
router.get('/mentorviewprofile', async (req, res, next) => {

    var data = await Mentor.findOne({Mentor_id:req.query.LogID});
    res.json({data: data})                                                                                                                                                                                     

});


//My Allocations
// router.get('/viewmyallocatedinterns', async (req, res, next) => {
//     var data = await Allocation.find({'mentor_id.Mentor_id': req.query.log_id}).populate('intern_id');
//     res.json({data: data})

// });
router.get('/viewmyallocatedinterns', async (req, res, next) => {
    try{
        var mdata = await Mentor.findOne({Mentor_id:req.query.log_id});
        var data = await Allocation.find({'mentor_id':mdata._id }).populate('intern_id');
        res.json({data: data})
    
    }
    catch{
        console.log('e');
    }
    
    
    
    });


//Assign Work
router.post('/mentor_assign_work', upload.any(), async (req, res, next) => {
    const log_id = req.body.log_id;
    const workTitle = req.body.workTitle;
    const textAreaValue = req.body.textAreaValue;
    const submissionDate = req.body.submissionDate;
    const interns = req.body.interns;
    const file = req.files[0];
    const attach_file = '/'+ file.destination + file.filename;
    const assign_date = new Date();
    const ment = await Mentor.findOne({Mentor_id: log_id});
    const workItem = {
        mentor_id: ment._id,
        workk_name: workTitle,
        work: textAreaValue,
        attach_file: attach_file,
        assign_date: assign_date,
        submission_date: submissionDate,
    };

    const workSave = await Work(workItem).save();
    for(i of interns) {
        const workAssignItem = {
            work_id: workSave._id,
            intern_id: i,
            workk_name: workTitle,
            work: textAreaValue,
            attach_file: attach_file,
            assign_date: assign_date,
            submission_date: submissionDate,
        };
        await AssignWork(workAssignItem).save()
    }

    res.json({data: 'ok'})

});

router.get('/mentor_view_works', async (req, res, next) => {
    var data = await Work.find({'mentor_id.Mentor': req.body.log_id});

    if (req.query.search) {
        var search = req.query.search;
        data = await Work.find({'mentor_id.Mentor': req.body.log_id, workk_name: {$regex: new RegExp('^' + search, 'i')}});
    }
    res.json({data: data})

});

router.get('/mentor_viewassigned_works', async (req, res, next) => {
    console.log(req.query.wid.toString());
    var data = await AssignWork.find({work_id: req.query.wid.toString()})
        .populate('work_id')
        .populate('intern_id');
        // .find({'mentor_id.Mentor': req.body.log_id});
    res.json({data: data})

});

router.get('/mentor_delete_assigned_works/:id', async (req, res, next) => {
    var data_ = await AssignWork.findOne({_id: req.params.id});
    var worksAssign_ = await AssignWork.find({work_id: data_.work_id});
    if (worksAssign_.length === 0) {
        await Work.findOneAndDelete({_id: data_.work_id});
    }
    var data = await AssignWork.findOneAndDelete({_id: req.params.id});
    res.json({data: data});

});


//Monitoring
router.get('/mentor_monitor_works', async (req, res, next) => {
    var data = await AssignWork.find()
        .populate('work_id')
        .populate('intern_id')
        .populate({
            path: 'work_id',
            populate: {
                path: 'mentor_id',
                match: {'Mentor_id': req.query.log_id}
            }
        });
    if (req.query.search) {
        var search = req.query.search;

        const datas = await AssignWork.find()
            .populate('work_id')
            .populate({
                path: 'intern_id',
            })
            .populate({
                path: 'work_id',
                populate: {
                    path: 'mentor_id',
                    match: {'mentor_id.Mentor_id': req.query.log_id}
                }
            });
        for(i of datas){
            if(i.intern_id.Name.toLowerCase().startsWith(search.toLowerCase())){
                data = [];
                data.push(i);

            }
        }
    }
    res.json({data: data})

});

router.post('/mentor_monitor_works_post', async (req, res, next) => {
    const assigned_work = req.body.ints;
    for (i of assigned_work){
        await AssignWork.findOneAndUpdate({_id: i}, {status: 'Completed'})
    }
    res.send('ok')

});

router.get('/generatereport', async function(req, res, next) {
    const allocation = await Allocation.find({intern_id: req.query.Int_id});
    const mentdat = await Mentor.find({Mentor_id: req.query.log_id});
    if (mentdat.length === 0){
        res.send('ment');
        return;
    }
    const work = await Work.find({mentor_id: req.query.log_id});
    const assignwrk = await AssignWork.find({});
    const intern = await Intern.find({_id: req.query.Int_id});
    const allocatecourse = await AllocatedCourse.find({intern_id: req.query.Int_id});
    if (allocatecourse.length === 0){
        res.send('crs');
        return;
    }
    const courses = await Course.find({_id: allocatecourse[0].course_id});


    var allocs = [];
    // console.log(work);
    for (const i of work) {
        for (const j of  assignwrk) {
            if (j.work_id === i._id && j.intern_id === req.query.Int_id) {
                //console.log("hello");
                const workreport = await WorkReport.find({assign_workid: j._id});
                try {
                    console.log("hello1",intern[0]);
                    allocs.push({
                        'id': j._id,
                        'workk_name': i.workk_name,
                        'assign_date': i.assign_date,
                        'View': i.attach_file,
                        'score': workreport[0].evaluation_score,
                        'feedback': workreport[0].feedback,
                        'intern': intern[0].Name,
                        'submission_date': i.submission_date,


                    });

                } catch (error) {
                }

            }
        }

    }


    var totalScore = 0;
    var numAllocs = 0;


    var data_ = await WorkReport.find().populate({
        path: 'assign_workid',
        populate: ['work_id', 'intern_id']
    });
let a=[];

    const int_id = req.query.Int_id;
    console.log(int_id);
    for (const k of data_){
        console.log("hello2",k.assign_workid.intern_id._id,int_id);
        if(k.assign_workid.intern_id._id==int_id)
        {
            a.push(k);
        }
    }


    console.log("hello3",a);




console.log("hello",data_);

    for (const alloc of data_) {

        console.log(alloc);
        if(alloc.evaluation_score!=='Pending') {
            totalScore += parseInt(alloc.evaluation_score);
            numAllocs++;
        }
    }
    var averageScore = totalScore / numAllocs;


    res.json({
        title: 'Report', mnn: allocs,
        Int_id: req.query.Int_id,
        intname: intern[0].Name,
        photo: intern[0].Photo,
        mentname: mentdat[0].Name,
        averageScore: averageScore,
        course: courses[0].course_name,
        Duration: courses[0].duration,
        alloc_id: allocation[0]._id,
        data_: a,
    });
});

router.get('/generatereport_dnld', async function(req, res, next) {
    const int_id = req.query.Int_id;
    const ment_id = await Mentor.findOne({Mentor_id: req.query.log_id});

      try {
    const [allocation, mentdat, work, assignwrk, intern] = await Promise.all([
      Allocation.find({ intern_id: int_id }),
      Mentor.find({ Mentor_id: req.query.log_id }),
      Work.find({ mentor_id: ment_id }),
      AssignWork.find({}),
      Intern.find({ _id: int_id }),
    ]);

    // console.log(intern);
    const allocatecourse = await AllocatedCourse.findOne({ intern_id: int_id });
    const courses = await Course.find({ _id: allocatecourse.course_id });
    const filteredAssignWrk = assignwrk.filter(
      (j) => j.intern_id._id.toString() ===  int_id
    ); // Filter assigned work for the specific intern
    const internData = intern[0]; // Use destructuring for clarity
    // console.log(internData);
    const allocs = [];
    for (const i of work) {
      for (const j of filteredAssignWrk) {
        // console.log(j.work_id.toString() === i._id.toString());
        if (j.work_id.toString() === i._id.toString()) {
          const workreport = await WorkReport.findOne({ assign_workid: j._id.toString() });
          if (workreport === null){
              continue;
          }

          try {
            allocs.push({
              id: j._id,
              workk_name: i.workk_name,
              assign_date: i.assign_date,
              View: i.attach_file,
              score: workreport.evaluation_score || 'Pending',
              feedback: workreport.feedback || 'NA',
              intern: internData.Name,
              submission_date: i.submission_date,
            });
          } catch (error) {
            console.error("Error processing assignment:", error);
          }
        }
      }
    }

    // const totalScore = allocs.reduce((acc, curr) => acc + parseInt(curr.score || 0), 0);
    var nums = 0;
    var totalScore = 0;
    for(i of allocs){
        if(i.score !== 'Pending'){
            nums++;
            totalScore=totalScore+parseFloat(i.score);
        }
    }
    const numAllocs = allocs.length;
    const averageScore = totalScore / (nums || 1);
    console.log(averageScore);
    const data = {
      mnn: allocs,

      Int_id: int_id,
      intname: internData.Name,
      photo: internData.Photo,
      mentname: mentdat[0].Name,
      averageScore: averageScore,
      course: courses[0].course_name || 'NA',
      Duration: courses[0].duration || 'NA',
      alloc_id: allocation[0]._id || 'NA',

    };

    // const ejsTemplate = 'C:\\Users\\navee\\Desktop\\LMS@\\login22\\login\\views\\mentor\\generatereport.ejs';
    const ejsTemplate = fs.readFileSync('managers/generate.ejs', 'utf8');
    // Use a try-catch block for error handling during PDF generation
    try {
      await generatePDF(ejsTemplate, data, `uploads/report/${int_id}.pdf`);
      var item = {
        course_id: allocatecourse.course_id,
        intern_id: int_id,
        generated_report: `uploads/report/${int_id}.pdf`,

      }

      var d1= await Generatereport.find({course_id : allocatecourse.course_id,intern_id:int_id});
      if(d1.length === 0){
        const Cors = new Generatereport(item);
        const savedC = await Cors.save();
        res.send({file: `/uploads/report/${int_id}.pdf`, status: 'ok'});
        // response.redirect("/addcoursedetails");
      }
      else
      {
        res.send({file: `/uploads/report/${int_id}.pdf`, status: 'dups'});

      }
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  } catch (err) {
    console.error("Error fetching data for PDF generation:", err);
    res.status(500).send('Error generating report');
  }
//   await open(int_id);

});


router.get('/mentor_view_submission_results', async (req, res, next) => {
    // console.log(req.query);
    var data_ = await WorkReport.find({}).populate({
        path: 'assign_workid',
        populate: ['work_id', 'intern_id']
    });
    if (req.query.search!==''){
        var datas_ = await WorkReport.find({}).populate({
            path: 'assign_workid',
            populate: ['work_id', 'intern_id']
        });
        data_ = [];
        for (i of datas_){
            if (i.assign_workid.work_id.workk_name.toLowerCase().startsWith(req.query.search.toLowerCase())){
                data_.push(i);
            }
        }
    }
    res.json({data: data_})

});

router.post('/mentor_send_evaluataion', async (req, res, next) => {
    const wid = req.body.wid;
    const score = req.body.score;
    const feedback = req.body.feedback;

    await WorkEvaluation.findOneAndUpdate({_id: wid}, {evaluation_score: score, feedback: feedback, status: 'Completed'});
    res.send('ok')

});

router.get('/mentor_view_queries', async (req, res, next) => {
    const mentid = await Mentor.findOne({Mentor_id: req.query.log_id});
    var data_ = await Queries.find().populate({
        path: 'allocation_id',
        populate: ['intern_id']
    });

    const dts = [];

    for(i of data_){
        if (i.allocation_id.mentor_id.toString() === mentid._id.toString()){
            dts.push(i);
        }
    }

    res.json({data: dts})

});

router.post('/mentor_send_reply', async (req, res, next) => {
    const qid = req.body.qid;
    const reply = req.body.reply;

    await Queries.findOneAndUpdate({_id: qid}, {reply: reply});
    res.send('ok')

});

async function generatePDF(ejsTemplate, data, outputPath) {
  const dir = 'uploads'; // Change this to the appropriate directory if needed
  const imgpath = path.join(dir, data.photo.replace('uploads', ''));
  // console.log(imgpath);
  const image = fs.readFileSync(imgpath, { encoding: 'base64' });
  const logo = fs.readFileSync(path.join('managers','logo.png'), { encoding: 'base64' });


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // console.log(data.photo);
  const htmlContent = ejs.render(ejsTemplate, {
    mnn: data.mnn,
    Int_id:data.Int_id,
    intname: data.intname,
    photo: `data:image/png;base64,${image}`, // Embedding the image
    logo: `data:image/png;base64,${logo}`, // Embedding the image
    mentname:data.mentname,
    averageScore:data.averageScore,
    course:data.course,
    Duration:data.Duration,
    alloc_id:data.alloc_id, });
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: 'A4' });

  




  await browser.close();
}

module.exports = router;
