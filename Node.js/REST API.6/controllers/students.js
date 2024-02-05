let students = [{
    id : "1",
    name : "Ali",
    grade : 70 
},
{
    id : "2",
    name: "Carmen",
    grade : 80
}
];

export const getAllStudents = (req,res) =>{
    res.json(students)
}

export const getStudentWithId = (req,res)=>{
    const id = req.params.id ;
    const student = students.filter(student=> student.id === id )
    if(student.length > 0){
        res.json(student);
    }else{
        res.send("student not found")
    }
}; 

export const deleteStudent = (req,res)=>{
    const id = req.params.id ;
    students = students.filter(student=> student.id !== id);
    res.send(`The student with id ${id} has been deleted `)
};

export const addStudent = (req,res)=>{
    students.push(req.body);
    res.send(`The student with id ${req.body.id} has been added`)
    
};

export const changStudent = (req,res)=>{
    const id = req.params.id;
    const {name,grade} = req.body;
    let student = students.find(student => student.id === id);
    if(name){
        student.name = name
    }if (grade){
        student.grade = grade
    }
    res.send(`The student with id ${req.params.id} has been changed`)
};    