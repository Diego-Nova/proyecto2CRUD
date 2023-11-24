function ValidateForm(){
    let name = document.getElementById('inputName').value;
    let adress = document.getElementById('inputAdress').value;
    let phone = document.getElementById('inputPhone').value;
    let email = document.getElementById('inputEmail').value;

    if (name == ""){
        alert('El campo nombre se requiere');
        return false;
    }

    if (adress == ""){
        alert('La direccion es requerida');
        return false;
    }

    if (phone == ""){
        alert('El telefono es requerido');
        return false;
    }

    if (email == ""){
        alert('El correo es requerido');
        return false;
    }else if(!email.includes('@')){
        alert('El correo no es valido');
        return false;
    }

    return true;
}

function ReadData(){

    let listpeople;

    if(localStorage.getItem('listpeople') == null){
        listpeople = [];
    }else{
        listpeople = JSON.parse(localStorage.getItem('listpeople'));
    }

    var html = "";

    listpeople.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.adress + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData('+ index +')" class="btn btn-warning">Editar Dato</button>';
        html += "</tr>";
    });

    document.querySelector('#tableData').innerHTML = html;

}

document.onload = ReadData();

function AddData (){
    if(ValidateForm() == true){
        let name = document.getElementById('inputName').value;
        let adress = document.getElementById('inputAdress').value;
        let phone = document.getElementById('inputPhone').value;
        let email = document.getElementById('inputEmail').value;

        var listpeople;

        if (localStorage.getItem('listpeople') == null){
            listpeople = [];
        }else{
            listpeople = JSON.parse(localStorage.getItem('listpeople'));
        }

        listpeople.push({
            name: name,
            adress: adress,
            phone: phone,
            email: email
        });

        localStorage.setItem('listpeople', JSON.stringify(listpeople));

        ReadData();

        document.getElementById('inputName').value= "";
        document.getElementById('inputAdress').value= "";
        document.getElementById('inputPhone').value= "";
        document.getElementById('inputEmail').value= "";
    }
}

function deleteData(index){
    
    let listpeople;

    if(localStorage.getItem('listpeople') == null){
        listpeople = [];
    }else{
        listpeople = JSON.parse(localStorage.getItem('listpeople'));
    }

    listpeople.splice(index, 1);
    localStorage.setItem('listpeople', JSON.stringify(listpeople));

    ReadData();
}

function editData(index){

    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listpeople;

    if(localStorage.getItem('listpeople') == null){
        listpeople = [];
    }else{
        listpeople = JSON.parse(localStorage.getItem('listpeople'));
    }

    document.getElementById('inputName').value = listpeople[index].name;
    document.getElementById('inputAdress').value = listpeople[index].adress;
    document.getElementById('inputPhone').value = listpeople[index].phone;
    document.getElementById('inputEmail').value = listpeople[index].email;

    document.querySelector('#btnUpdate').onclick = function (){
        if (ValidateForm() == true){
            listpeople[index].name = document.getElementById('inputName').value;
            listpeople[index].adress = document.getElementById('inputAdress').value;
            listpeople[index].phone = document.getElementById('inputPhone').value;
            listpeople[index].email = document.getElementById('inputEmail').value;

            localStorage.setItem('listpeople', JSON.stringify(listpeople));
            ReadData();
            
            document.getElementById('inputName').value = "";
            document.getElementById('inputAdress').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputEmail').value = "";

            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }

}

