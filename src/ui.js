export class UI
{
    constructor()
    {
         this.employeesList=document.getElementById("employees");//tbody
         this.updatebutton=document.getElementById("update");   //güncelleme butonu
         this.nameInput=document.getElementById("name");
         this.departmentInput=document.getElementById("department"); //INPUTS
         this.salaryInput=document.getElementById("salary");
    }

    addEmployees(empDataList)
    {
        let result="";

        empDataList.forEach(employee => 
            {
               result+=
                `<tr>                                
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>`;
            });
            this.employeesList.innerHTML=result;
    };

    deleteEmployees(element)
    {
         element.remove();
    };
    toggleUpdateButton(updateRow)
    {
        if(this.updatebutton.style.display==="none")
        {
            this.updatebutton.style.display="block";
            this.addEmployeeInfoToUI(updateRow);
        }
        else
        {
             this.updatebutton.style.display="none";
             this.clearInputs();
        }
    }

    clearInputs()
    {
        this.nameInput.value="";
        this.departmentInput.value="";
        this.salaryInput.value="";
    };

    addEmployeeInfoToUI(updateRow)
    {
        const children=updateRow.children;
        this.nameInput.value=children[0].textContent;
        this.departmentInput.value=children[1].textContent;
        this.salaryInput.value=children[2].textContent;
    }

    updateEmployeeOnUI(newEmpData,oldEmpData)
    {
        oldEmpData.innerHTML=
    `<tr>                                
        <td>${newEmpData.name}</td>
        <td>${newEmpData.department}</td>
        <td>${newEmpData.salary}</td>
        <td>${newEmpData.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`;
    
        this.clearInputs();
    };
   

}