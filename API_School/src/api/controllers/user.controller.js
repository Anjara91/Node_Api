const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {createToken} = require("../../utils/jwt");

const addUser =async(req, res)=>{
    try {
        const data = req.body;
        const newUser = new Users(data);
        const createdUser = await newUser.save();
        return res.json({message: "usuario creado", data:createdUser});

    } catch (error) {
        console.log(error)
    }
};

const getUsers = async(req, res)=>{
    try {
        const listUsers = await Users.find();
        res.json({success:true, list : listUsers});

    } catch (error) {
        console.log(error)
    }
};

const deleteUsers = async (req, res)=>{
    try {
        const deleteUsers = await Users.findByIdAndDelete(req.params.id);
        return res.json(deleteUsers);
    } catch (error) {
        
    }
};

const updateUsers = async (req, res) =>{

    const id = req.params.id;
    const curso = req.body;

    try {
        const newUser = await Users.findByIdAndUpdate(id, curso, {new:true})
        return res.json(newUser);
    } catch (error) {
        
    }

};

const register = async(req,res)=>{
try {
    //recibo los datos
    const newUser = req.body;
    //valido si el usuario ya existe en la bbdd
    const userDB = await Users.find({email: newUser.email});
    //si existe envio error de respuesta
    if(userDB.length !== 0){
        return res.json({message: "El email ya esta registrado"});
    }
 //si no existe -->encripto la contraseña y lo añado
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await Users.create(newUser);
   
    return res.json(user);

} catch (error) {
    
}
};

const login = async (req, res) => {
    try {
    //recibir los datos
    const {email, password} = req.body;

    //verificar que el email existe findOne
    //const userDB = await Users.findOne({email: req.body.email});   es lo mismo que abajo pero abajo está simplificado
    const userDB = await Users.findOne({email});
    if(!userDB){
      return res.json({message: "el email no existe"});
    }
    //comparar la contraseña del usuario con la de la bbdd bycrypt.compare()
    const same = await bcrypt.compare(password, userDB.password);

    //si no coinciden envio mensaje de error
    if(!same ){
        return res.json({message: "contraseña incorrecta"});
    }
    //si coinciden creo el token
    const token = createToken(userDB);
    return res.json({
    message:"login exitoso", 
    token: createToken(userDB)
});

    } catch (error) {
        
    }
};

const getProfile = async (req, res) => {
   //busco en la BD la informacion que me interesa de ese usuario
     const dataUser = await Users.find({email:req.user.email});
    return res.json(dataUser);
};

const registerUpload = async (req, res) => {
    const newUser = new Users(req.body);
    if(req.file.path){
        newUser.image = req.file.path;
    }
    const createdUser = await newUser.save();
    return res.json(createdUser);
};

module.exports = {addUser, getUsers, updateUsers, deleteUsers, register, login, getProfile, registerUpload};
