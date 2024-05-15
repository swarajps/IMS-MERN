const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionManager = require('../managers/sessionManager');
const checkAuth = require('../managers/auth');
const multer = require('multer');
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
router.get('/internviewprofile', async (req, res, next) => {

    var data = await Intern.findOne({Inter_id:req.query.LogID});
    res.json({data: data})                                                                                                                                                                                     

});


//ChangePassword
router.post('/changepass', async function(request, response, next) {
    const chngpass = await Login.findOne({_id: request.body.log_id.toString()});
    var current_pass = request.body.currentPassword;
    var new_pass = request.body.newPassword;

    var item = {
        password: new_pass,
    };
    if (chngpass.password === current_pass) {
        const changpass = await Login.find({_id: request.body.log_id.toString()}).findOneAndUpdate(item);

        response.send('ok');
    } else {
        response.send('no');
    }

});


//My Allocations
router.get('/viewmyallocatedcourses', async (req, res, next) => {
    const intid = await Intern.findOne({'Inter_id': req.query.log_id});
    var data = await CourseAllocation.find({intern_id: intid}).populate('course_id');
    var genRep = await Generatereport.findOne({intern_id: intid._id.toString()});
    var rep = '';
    if (genRep !== null){
        rep = genRep;
    }
    console.log(rep, genRep);
    res.json({data: data, rep: rep})

});

router.get('/intern_generatereport', async function(req, res, next) {
    const intid = await Intern.findOne({'Inter_id': req.query.log_id});
    const allocation = await Allocation.find({'intern_id': intid});
    if(allocation.length === 0){
        res.send('no');
        return;
    }
    const mentdat = await Mentor.find({_id: allocation[0].mentor_id});
    const work = await Work.find({mentor_id: allocation[0].mentor_id});
    const assignwrk = await AssignWork.find({});
    const intern = await Intern.find({Inter_id: req.query.log_id});
    const allocatecourse = await AllocatedCourse.find({'intern_id': intid, course_id: req.query.cid});
    if(allocatecourse.length === 0){
        res.send('crs');
        return;
    }

    const courses = await Course.find({_id: allocatecourse[0].course_id});


    var allocs = [];
    // console.log(work);
    for (const i of work) {
        for (const j of  assignwrk) {
            if (j.work_id === i._id && j.intern_id.Inter_id === req.query.log_id) {
                //console.log("hello");
                const workreport = await WorkReport.find({assign_workid: j._id});
                try {
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
    }).find();
    var dtds = [];

    for (i of data_){
        if(i.assign_workid.intern_id._id.toString() ===intid._id.toString()){
            dtds.push(i);
        }
    }

    console.log(dtds);

    for (const alloc of data_) {
        if(alloc.evaluation_score!=='Pending' && intid === alloc.assign_workid.intern_id) {
            totalScore += parseInt(alloc.evaluation_score);
            numAllocs++;
        }
    }
    var averageScore = totalScore / numAllocs;


    res.json({
        title: 'Report', mnn: allocs,
        Int_id: intid.Inter_id,
        intname: intern[0].Name,
        photo: intern[0].Photo,
        mentname: mentdat[0].Name,
        averageScore: averageScore,
        course: courses[0].course_name,
        Duration: courses[0].duration,
        alloc_id: allocation[0]._id,
        cid: req.query.cid,
        data_: dtds,
    });
});

//Queries
router.get('/intern_view_queries', async (req, res, next) => {
    const  intid = await Intern.findOne({Inter_id: req.query.log_id});
    const alloc = await Allocation.findOne({intern_id: intid});
    var data = await Queries.find({'allocation_id': alloc});
    res.json({data: data})

});

router.post('/intern_send_query', async (req, res, next) => {
    const  intid = await Intern.findOne({Inter_id: req.body.log_id});
    const alloc = await Allocation.findOne({intern_id: intid});
    const query = req.body.query;
    await new Queries({
        allocation_id: alloc,
        query: query,
    }).save();

    res.json('ok')

});

//Assigned Work
router.get('/intern_viewassigned_works', async (req, res, next) => {
    const  intid = await Intern.findOne({Inter_id: req.query.log_id});
    var data = await AssignWork.find({intern_id: intid})
        .populate('work_id');
    res.json({data: data})

});

router.get('/intern_viewsubmitted_reports', async (req, res, next) => {
    const  intid = await Intern.findOne({Inter_id: req.query.log_id});
    const aid =  req.query.aid;

    
    var data1 = await AssignWork.find({intern_id: intid._id});
    for(i of data1)
        {

            if(i._id==aid)
                var data2=i;
        }
        console.log(data2);

    var data = await Work.find({_id: data2.work_id}).populate('_id');    


    res.json({data: data})

});

router.post('/assignmentsubmission', upload.single('fileField'), async (req, res, next) => {
    const  intid = await Intern.findOne({Inter_id: req.body.log_id});
    const aid = req.body.aid;
    const answer = req.body.answer;


    const file = req.file;
    console.log(file);
    const attach_file = '/'+ file.destination + file.filename;
    await new WorkReport({
        assign_workid: aid,
        submission_date: new Date(),
        work_content: attach_file,
        attach_file: attach_file,
        evaluation_score: 'Pending',
        feedback: answer,
    }).save();

    res.json('ok')

});


module.exports = router;
