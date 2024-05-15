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
const AssignWork = require('../models/assignwork');
const Queries = require('../models/queryandreply');

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



//Course Mgmt
router.post('/addcoursedetail', async (req, res, next) => {
    var Course_id = req.body.courseId;
    var Course_name = req.body.courseName;
    var Duration = req.body.duration;
    var Fees = req.body.fees;
    var item = {
        course_id: Course_id,
        course_name: Course_name,
        duration: Duration,
        fees: Fees,
    }

    var d1 = await Course.find({
        $or: [
            {course_id: Course_id},
            {course_name: Course_name}
        ]
    });
    if (d1.length === 0) {
        const Cors = new Course(item);
        const savedC = await Cors.save();
        res.send("ok");
    }
    else {
        res.send('no');

    }

});

router.get('/view_all_course', checkAuth, async (req, res, next) => {
    const data = await Course.find();
    res.json({data: data})
});

router.post('/editcor', checkAuth, async function(request, response, next){
  var id = request.body.cord;
  var Name = request.body.courseName;
  var Duration = request.body.duration;
  var Fees = request.body.fees;


  var item = {
    course_name: Name,
    duration:Duration,
    fees:Fees

  };
  const Coredit = await Course.findOne({_id:id}).findOneAndUpdate(item);
  response.send('ok');
});

router.get('/deletecourse', checkAuth, async function(req, res, next) {
  await Course.findOneAndDelete({_id:req.query.cid.toString()});
  res.send('ok');
});


//Mentor Mgmt
router.post('/addment',upload.single('fileField'), async function(request, response, next) {
    const dt = request.dt;
   var empcode = request.body.employeeCode;
    var name = request.body.name;
    var doB = request.body.dob;
    var gender = request.body.gender;
    var phone = request.body.phoneNo;
    var pin = request.body.pin;
    var email = request.body.email;
    var qualification = request.body.qualification;
    var jn_date = request.body.joinDate;
    var state = request.body.state;
    var city = request.body.city;

    var photo = '/uploads/images/' + request.file.filename;  // + '-' + dt + path.extname(request.file.originalname);

    var d1 = await Login.find({username: email});
    if (d1.length !== 0 || !request.file) {
        if(request.file){
            fs.unlinkSync(request.file.path);
        }
        response.send('no');
        return;

    }
    var logitem = {
        username: email,
        password: phone,
        type: "mentor",
    };

    const logint = await new Login(logitem).save();
    var item = {
        Mentor_id: logint._id,
        Name: name,
        Gender: gender,
        Dob: doB,
        Email: email,
        Phone: phone,
        State: state,
        City: city,
        PIN: pin,
        Employee_code: empcode,
        Qualifications: qualification,
        join_date: jn_date,
        photo: photo,
    };

    await new Mentor(item).save();
    response.send('ok')


});

router.get('/view_all_mentors', async (req, res, next) => {
    var data = await Mentor.find();
    if (req.query.search) {
        var search = req.query.search;
        data = await Mentor.find({Name: {$regex: new RegExp('^' + search, 'i')}});
    }
    res.json({data: data})

});

router.post('/editment',upload.single('fileField'), async function(request, response, next) {
    const dt = request.dt;
    var id = request.body.id;
    var empcode = request.body.employeeCode;
    var name = request.body.name;
    var doB = request.body.dob;
    var gender = request.body.gender;
    var phone = request.body.phoneNo;
    var pin = request.body.pin;
    var email = request.body.email;
    var qualification = request.body.qualification;
    var jn_date = request.body.joinDate;
    var state = request.body.state;
    var city = request.body.city;

    var item = {
        _id: id,
        Name: name,
        Gender: gender,
        Dob: doB,
        Email: email,
        Phone: phone,
        State: state,
        City: city,
        PIN: pin,
        Employee_code: empcode,
        Qualifications: qualification,
        join_date: jn_date,
    };

    if (request.file){
        var photo = '/uploads/images/' + request.file.filename;  // + '-' + dt + path.extname(request.file.originalname);
        item['photo'] = photo;
    }

    await Mentor.findOne({_id: id}).findOneAndUpdate(item);
    response.send('ok')


});

router.get('/delete_mentor', async function(req, res, next) {
 
  await Login.findOneAndDelete({_id:req.query.mid});
  await Mentor.findOneAndDelete({Mentor_id:req.query.mid});
  res.send('ok');


});


//Intern Mgmt
router.post('/addintern',upload.single('fileField'), async function(request, response, next) {
    const dt = request.dt;
    var name = request.body.name;
    var doB = request.body.dob;
    var gender = request.body.gender;
    var phone = request.body.phoneNo;
    var pin = request.body.pin;
    var email = request.body.email;
    var qualification = request.body.qualification;
    var jn_date = request.body.joinDate;
    var state = request.body.state;
    var city = request.body.city;

    var photo = '/uploads/images/' + request.file.filename;  // + '-' + dt + path.extname(request.file.originalname);

    var d1 = await Login.find({username: email});
    if (d1.length !== 0 || !request.file) {
        if(request.file){
            fs.unlinkSync(request.file.path);
        }
        response.send('no');
        return;

    }
    var logitem = {
        username: email,
        password: phone,
        type: "intern",
    };

    const logint = await new Login(logitem).save();
    var item = {
        Inter_id: logint._id,
        Name: name,
        Gender: gender,
        Dob: doB,
        Email: email,
        Phone: phone,
        State: state,
        City: city,
        Pin: pin,
        Qualifications: qualification,
        Join_date: jn_date,
        Photo: photo,
    };

    await new Intern(item).save();
    response.send('ok')


});

router.get('/view_all_interns', async (req, res, next) => {
    var data = await Intern.find();
    if (req.query.search) {
        var search = req.query.search;
        data = await Intern.find({Name: {$regex: new RegExp('^' + search, 'i')}});
    }
    res.json({data: data})

});

router.post('/editintern',upload.single('fileField'), async function(request, response, next) {
    const dt = request.dt;
    var id = request.body.id;
    var name = request.body.name;
    var doB = request.body.dob;
    var gender = request.body.gender;
    var phone = request.body.phoneNo;
    var pin = request.body.pin;
    var email = request.body.email;
    var qualification = request.body.qualification;
    var jn_date = request.body.joinDate;
    var state = request.body.state;
    var city = request.body.city;

    var item = {
        _id: id,
        Name: name,
        Gender: gender,
        Dob: doB,
        Email: email,
        Phone: phone,
        State: state,
        City: city,
        Pin: pin,
        Qualifications: qualification,
        Join_date: jn_date,
    };

    if (request.file){
        var photo = '/uploads/images/' + request.file.filename;  // + '-' + dt + path.extname(request.file.originalname);
        item['Photo'] = photo;
    }

    await Intern.findOne({_id: id}).findOneAndUpdate(item);
    response.send('ok')


});

router.get('/delete_intern', async function(req, res, next) {
    const intid = await Intern.findOne({Inter_id:req.query.mid});
    const qryrp = await Queries.deleteMany({'allocation_id.intern_id': intid});
    const aswrk = await AssignWork.deleteMany({intern_id: intid});
    const alloc = await Allocation.deleteMany({intern_id: intid});
  
    await Login.findOneAndDelete({_id:req.query.mid});
    await Intern.findOneAndDelete({Inter_id:req.query.mid});
    res.send('ok');
});


//Allocation
router.post('/allocatementor', async function(request, response, next) {
    const mentor = request.body.select1;
    const intern = request.body.select2;
    var item = {
        mentor_id: mentor,
        intern_id: intern,
        date: Date.now(),
    };
    const alloc = await Allocation.find({intern_id: intern});
    if (alloc.length !== 0) {
        response.send('no');
    }else {
        await new Allocation(item).save();
        response.send('ok')
    }


});

router.get('/ViewAllocation', async (req, res, next) => {
    var data = await Allocation.find().populate('intern_id').populate('mentor_id');
    if (req.query.search) {
        var search = req.query.search;
        data = await Allocation.find({Inter_id__Name: {$regex: new RegExp('^' + search, 'i')}}).populate();
    }
    res.json({data: data})

});

router.get('/delete_allocation/:mid', checkAuth, async function(req, res, next) {
  await Allocation.findOneAndDelete({_id:req.params.mid});
  res.send('ok');
});


//CourseAllocation
router.post('/allocatecourse', async function(request, response, next) {
    const course = request.body.select1;
    const intern = request.body.select2;
    var item = {
        course_id: course,
        intern_id: intern,
        status: 'Allocated',
    };
    const alloc = await CourseAllocation.find(item);
    if (alloc.length !== 0) {
        response.send('no');
    }else {
        await new CourseAllocation(item).save();
        response.send('ok')
    }


});

router.get('/ViewCourseAllocation', async (req, res, next) => {
    var data = await CourseAllocation.find().populate('intern_id').populate('course_id');
    res.json({data: data})

});

router.get('/delete_course_allocation/:mid', async function(req, res, next) {
  await CourseAllocation.findOneAndDelete({_id:req.params.mid});
  res.send('ok');
});

module.exports = router;
