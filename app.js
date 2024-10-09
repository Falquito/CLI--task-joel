const readline = require ("readline");
const fs = require ('node:fs')
//i create interface for read lines
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
let cant_task;
fs.readFile('tasks.json','utf8',(err,data)=>{
    if(err){
        console.error(err)
    }else{
        cant_task=JSON.parse(data).length
    }
})

    const list_args = process.argv.slice(2)

        if(list_args[0]=="add"){
            rl.question("description of task:",(description_task)=>{
                fs.writeFile('tasks.json',JSON.stringify([],null,2),(err)=>{
                    if(err){
                        console.error("error write file")
                        return
                    }else{
                        fs.readFile('tasks.json','utf8',(err,data)=>{
                            if(err){
                                console.error("error read file :(")
                                return
                            }else{
                                const list_tasks = JSON.parse(data)
                                list_tasks.push({
                                    id:cant_task+1,
                                    description:description_task,
                                    status:"todo",
                                    createdAt:new Date(),
                                    updatedAt:"no updated"
                                })
                                fs.writeFile('tasks.json',JSON.stringify(list_tasks,null,2),(err)=>{
                                    if(err){
                                        console.error("error write file")
                                    }else{
                                        console.log("task added successfully (id:) ",cant_task)
                                        rl.close()
                                        
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }else if(list_args[0]=="update"){
            rl.question("Whats its the id of your task?: ",(id_task)=>{
                fs.readFile('tasks.json','utf8',(err,data)=>{
                    if(err){
                        console.error("read file error :(")
                        return
                    }else{
                        const list_tasks = JSON.parse(data);
                        rl.question("new description of task: ",(new_description)=>{
                            for(let i=0;i<list_tasks.length;i++){
                                
                                if(list_tasks[i].id==id_task){
                                    list_tasks[i].description=new_description
                                    list_tasks[i].updatedAt=new Date()
                                }
                            }
                            fs.writeFile('tasks.json',JSON.stringify(list_tasks,null,2),(err)=>{
                                if(err){
                                    console.error("error write file")
                                }else{
                                    console.log("Task updated successfully!")
                                }
                            })
                            rl.close();
                        })
                    }
                })
            })
        }else if(list_args[0]=="delete"){
            rl.question("id of task for delete",(id_task)=>{
                fs.readFile('tasks.json','utf8',(err,data)=>{
                    if(err){
                        console.error("error read file")
                    }else{
                        const list_tasks = JSON.parse(data)
                        const new_list_tasks=[]
                        for(let i=0;i<list_tasks.length;i++){
                            if(!list_tasks[i].id==id_task){
                                new_list_tasks.push(list_tasks[i])
                            }
                        }
                        fs.writeFile('tasks.json',JSON.stringify(new_list_tasks,null,2),(err)=>{
                            if(err){
                                console.error("error write file")
                            }else{
                                console.log("task deleted successfully")
                                rl.close()
                            }
                        })
                    }
                })
            })
        }else if(list_args[0]=="mark"){
            rl.question('id of task: ',(id_task)=>{
                rl.question('what is the state of task: ',(state_task)=>{
                    fs.readFile('tasks.json','utf8',(err,data)=>{
                        if(err){
                            console.error("error read file")
                        }else{
                            const list_tasks=JSON.parse(data)
                            for(let i=0;i<list_tasks.length;i++){
                                if(list_tasks[i].id==id_task){
                                    list_tasks[i].status=state_task
                                }
                            }
                            fs.writeFile('tasks.json',JSON.stringify(list_tasks,null,2),(err)=>{
                                if(err){
                                    console.error("error write file")
                                }else{
                                    console.log("state of task updated successfully :)")
                                    rl.close()
                                }
                            })
                        }
                    })
                })
            })
        }else if(list_args[0]=="list" && list_args[1]==null){
            fs.readFile('tasks.json','utf8',(err,data)=>{
                if(err){
                    console.error("error read file")
                    return;
                }else{
                    const list_tasks=JSON.parse(data)
                    console.log("LISTA DE TAREAS")
                    for(let i=0;i<list_tasks.length;i++){
                        console.log(list_tasks[i])
                    }
                }
            })
        }else if(list_args[0]=='list' && list_args[1]!=null){
            fs.readFile('tasks.json','utf8',(err,data)=>{
                if(err){
                    console.error("error read file")
                    return;
                }else{
                    console.log(`Lista de tareas segun su estado(${list_args[1]})`)
                    const list_tasks =JSON.parse(data);
                    for(let i=0;i<list_tasks.length;i++){
                        if(list_tasks[i].status==list_args[1]){
                            console.log(list_tasks[i])
                        }
                    }
                }
            })
        }
