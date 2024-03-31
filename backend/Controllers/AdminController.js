const Admin = require('../Models/AdminModel');

// GET all admins
 async function GetAllAdmins (req, res) {
    try {
        const admins = await Admin.find({});
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const AdminById = async (req, res,next) => {
	const admin = await Admin.findById(req.params.id);
	if (admin) {
	res.json(admin)
} else{
	const err = new Error('Admin not found');
	next(err)
}
};


// CREATE new admin
async function CreateAdmin (req, res) {
	try{
		const { nom , prenom , identifiant, mot_de_passe}=req.body;
    const admin = new Admin({nom, prenom, identifiant, mot_de_passe});
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE admin by ID
 async function UpdateAdmin (req, res) {
   try { 
		const { id } = req.params;
		 const { nom , prenom, identifiant, mot_de_passe }= req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { nom:nom }, {prenom: prenom }, {identifiant: identifiant} , {mot_de_passe: mot_de_passe}, {new:true});
        res.json(updatedAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE admin by ID
 async function DeleteAdmin (req, res) {
    try {
			let Id = req.params.id;
        const deleted = await res.findByIdAndDelete(Id);
				await deleted.save();
        res.json({ message: 'Admin deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports ={ GetAllAdmins,AdminById,  CreateAdmin, UpdateAdmin, DeleteAdmin}