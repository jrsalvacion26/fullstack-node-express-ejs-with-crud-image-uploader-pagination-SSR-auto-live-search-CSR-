
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = ('path')



const post_blogs = require('../controller/post')
const show_blogs = require('../controller/show_All_post')
const edit_blogs = require('../controller/edit_post')
const update_blogs = require('../controller/update_post')
const delete_blogs = require('../controller/delete_post')
const pagination = require('../controller/pagination')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"./upload")
    },
    filename:(req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname )
    }
})

const upload = multer({
    storage:storage,
})



const resultsPerPage = 6;
router.get('/', async(req, res) => {
    const {id} = req.params
    const result = await show_blogs(id)
    
    const length = result.length
    const pages = Math.ceil(length / resultsPerPage )
    let page = req.query.page ? Number(req.query.page) : 1;
        if(page > pages){
            res.redirect('/?page='+encodeURIComponent(pages));
            
        }else if(page < 1){
            res.redirect('/?page='+encodeURIComponent('1'));
            
        }
    
    const limit = (page - 1) * resultsPerPage;
    const all = await pagination(limit,resultsPerPage)
    
    if(all){
        let iterator = (page - 1) < 1 ? 1 : page - 1
        
        let endingLink = (iterator + 11) <= pages ? (iterator + 11) : page + (pages - page);
        if(endingLink < (page + 2)){
            iterator -= (page + 2) - pages;
        }
        return res.render('../views/show_blogs.ejs', {
            data:all,
            page,
            iterator,
            endingLink,
            pages,
            added:req.flash('message'),
            update:req.flash('update'),
            delete:req.flash('delete')
        })
        
    }
})



//post
router.get('/posting',async(req, res) => {
    return res.render('../views/posting_blogs.ejs')
})





//,upload.single('image')
//create post
router.post('/post',upload.single('image'),async(req, res) => {
    const {author, description} = req.body
    const image = req.file.filename

    const result = await post_blogs(author, description, image)
    
    if(result){
         
        req.flash('message', 'New Added Blogs Successfully') 
        res.redirect('/')
        return 
    }else{
        return res.status(500)
    }
})

router.get('/posting',async(req, res) => {
    return res.render('../views/posting_blogs.ejs')
})


//update the form
router.post('/update',upload.single('image'), async(req, res) => {
    const { id,author,description} = req.body
    const image = req.file.filename
    
    const result = await update_blogs(id, author, image, description)

    if(result){
        
        req.flash('update', 'Update Blogs Successfully') 
        res.status(201).redirect('/')
        return 
    }else{
        return res.status(500)
    }
})

//edit and go to the form
router.get('/edit/:id', async(req, res) => {
    const {id} = req.params
    const result = await edit_blogs(id)

    if(result){     
        return res.render('../views/edit.ejs', {
            
            data :result[0]
           
        })
        
    }
})


//delete
router.get('/delete/:id', async(req, res) => {
    const {id} = req.params
  
    const result = await delete_blogs(id)

    if(result){
        req.flash('delete', 'delete Blogs Successfully') 
        res.redirect('/');
        return 
    }else{
        res.status(500)
    }
})


module.exports = router