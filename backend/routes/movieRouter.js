const express = require('express');
const router = express.Router()
const {upload} = require('../config/multer.js');
const  { 
    all,
    find,
    update,
    create,
    destroy
} = require('../controllers/movieController.js')

router.get('/', all)
router.get('/:id', find)
router.post('/', upload.fields([{name:'cover'},{name:'video'}]), create);
router.put('/:id', upload.fields([{name:'cover'},{name:'video'}]), update);
router.delete('/:id', destroy); 

module.exports = router;