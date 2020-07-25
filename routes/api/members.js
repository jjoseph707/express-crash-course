const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = require('../../Members');

//View all route
router.get('/',(req,res)=>{
	res.json(members);
});
//View single route
router.get('/:id',(req,res)=>{
	const found = members.some(member=>member.id===parseInt(req.params.id));
	if (found){
		res.json(members.filter(member=>member.id===parseInt(req.params.id)));
	} else {
		res.status(400).json({msg:`No member with the id: ${req.params.id}`});
	}

});
//Create route
router.post('/',(req,res)=>{
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		status: req.body.status
	}
	if(!newMember.name || !newMember.status){
		return res.status(400).json({msg:'Please include the name/status'});
	}
	members.push(newMember);
	res.json(members);
	// res.redirect('/');
});
//Update route
router.put('/:id',(req,res)=>{
	const found = members.some(member=>member.id===parseInt(req.params.id));
	if (found){
		const updMember = req.body;
		members.forEach(member=>{
			if(member.id===parseInt(req.params.id)){
				member.name=updMember.name?updMember.name:member.name;
				member.status=updMember.status?updMember.status:member.status;
				res.json({msg:"Member successfully updated",member})
			}
		});
	} else {
		res.status(400).json({msg:`No member with the id: ${req.params.id}`});
	}

});
//Delete route
router.delete('/:id',(req,res)=>{
	const found = members.some(member=>member.id===parseInt(req.params.id));
	if (found){
		res.json({
			msg:'Member deleted',
			members:members.filter(member=>member.id!==parseInt(req.params.id))
		});
	} else {
		res.status(400).json({msg:`No member with the id: ${req.params.id}`});
	}

});

module.exports = router;