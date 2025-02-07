
import { useState } from "react"
import "./RegFrm2.css"

function RegFrm2(){

    //Creating object of values using use state
const [user,setUser]=useState({
    name:"Ram Kumar",
    age:25,
    gender:"Male",
    isMarried:true
});
    return(
     <>
     {/* display value in table format */}
     <table>
        <tr>
            <th>Name</th>
            <td>{user.name}</td>
        </tr>
        <tr>
            <th>Age</th>
            <td>{user.age}</td>
        </tr>
        <tr>
            <th>Gender</th>
            <td>{user.gender}</td>
        </tr>
        <tr>
            <th>Marital Status</th>
            <td>{user.isMarried?"True":"False"}</td>
        </tr>
     </table>

     {/* Creating form for collect input from user and display dynamically in table*/}
     <form action="">
        <input  value={user.name} type="text" placeholder="Full Name"/>
        <input  value={user.age}  type="number" placeholder="Age" />

    <div className="gender">
        <label htmlFor="male">
            <input checked={user.gender=="Male"} value={user.gender} type="radio"  name="gender" id="male"/>
             Male
        </label>

        <label htmlFor="female">
            <input checked={user.gender=="Female"} value={user.gender} type="radio"  name="gender" id="female"/>
            Female
        </label>
    </div>

    <label htmlFor="isMarried">
        <input checked={user.isMarried==true} type="checkbox" id="isMarried"/>
          is Married
    </label> 

     </form>
     </>  
    )
}

export default RegFrm2