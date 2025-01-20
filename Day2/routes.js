import { Router } from 'express';
import Posts from './controller.js';

const router = Router();

router.get('/getall', Posts.getAll);
router.post('/addpost', Posts.addPost);
router.get('/getallsorted', Posts.getAllSorted);
router.delete('/deletepost/:id', Posts.deletePost);
router.put('/updatepost/:id', Posts.updatePost);
router.get('/searchpost/:id', Posts.searchPost);

export default router;
