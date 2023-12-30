//IMPORTS
import {Requests} from "./requests.js";
import {UI} from "./ui.js";

const form=document.getElementById("employee-form");
const upbutton=document.getElementById("update");
const tbody=document.getElementById("employees");

//INPUTS
const name=document.getElementById("name");
const department=document.getElementById("department");
const salary=document.getElementById("salary");

//OBJECTS
const request = new Requests("http://localhost:3000/employees");
const ui=new UI();

//EVENTS
allEventsListener();

let updateState=null;//id ve tr'yi anlık olarak geçici almak için.

function allEventsListener()
{
    document.addEventListener("DOMContentLoaded",getAllLoaded);
    form.addEventListener("submit",employeeAdd);
    tbody.addEventListener("click",updateOrDelete);
    upbutton.addEventListener("click",upEmployees);
}

function employeeAdd(e)
{
    const empName=name.value.trim();
    const empDepartment=department.value.trim();
    const empSalary=salary.value.trim();

    //Uİ add
    if(empName==="" || empDepartment===""|| empSalary==="")
    {
        alert("Lütfen tüm alanları doldurunuz!");
    }
    else
    {
        request.post({name:empName,department:empDepartment,salary:Number(empSalary)}).
        then(newEmployee=>ui.addEmployees(newEmployee)).
        catch(err=>console.error(err));
    }

    //Clear Inputs
    ui.clearInputs();

    e.preventDefault();
}

function getAllLoaded()
{
   request.get().
   then(employees=>{ui.addEmployees(employees)}).
   catch(err=>console.error(err));
  
}
function updateOrDelete(e)
{   
    if(e.target.id==="delete-employee")
    {
        deleteEmployee(e.target);
    }
    else if(e.target.id==="update-employee")
    {
        updateEmployee(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmp)
{
    const id=targetEmp.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id).
    then(message=>{
        ui.deleteEmployees(targetEmp.parentElement.parentElement);
    }).
    catch(err=>console.error(err));
}

function updateEmployee(targetEmp)
{
    ui.toggleUpdateButton(targetEmp);

    if(updateState===null) //Arka planda tıkladığın satırın verilerini kaydetsin.
    {
        updateState={
            updateID:targetEmp.children[3].textContent, //tr'nin 3.çocuğu id
            updateParent:targetEmp //tr
        };
    }
    else
    {
        updateState=null; //Güncelleme yapmadığında eski haline çevirsin.
    }
}

function upEmployees(e)
{
    if(updateState)//Eğer obje oluşmuşsa:
    {
        const id=updateState.updateID;//Anlık olarak kaydedilen objenin içindeki id.

        const data={ //Güncellenmiş verilerin objesi.
            name:name.value.trim(),
            department:department.value.trim(),
            salary:Number(salary.value.trim())
        };

        request.put(id,data).
        then(newEmpData=>{
            ui.updateEmployeeOnUI(newEmpData,updateState.updateParent)//UI'de yeniyi eski ile değiştir.
        }).catch(err=>console.log(err));
    }
}


