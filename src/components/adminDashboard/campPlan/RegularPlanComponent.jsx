import { useEffect , useState, useReducer } from "react";
import {
    useParams
} from "react-router-dom";
import {ApiServices} from "../../../API/ApiServices";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory} from "react-router-dom";
import exerciseServices from "../../../API/exerciseServices";

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
  }));
export default function RegularPlanComponent(){
    const [update, setUpdate]= useState({update:false,_id:null});
    const history = useHistory();
    let { id } = useParams();
    let {date} = useParams();
    const classes = useStyles();
    const [breakfastList, setBreakfastList]=useState([]);
    const [exerciseList, setExerciseList]=useState([]);
    const [lunchList, setLunchList]=useState([]);
    const [dinnerList, setDinnerList]=useState([]);

    const [camp, setCamp] = useReducer( (oldstate,updates)=>({...oldstate,...updates}),{
        date:date,
        camp:id,
        breakfast:'',
        lunch:'',
        dinner:'',
        exercise1:'',
        exercise2:'',
        exercise3:''
    });
    const [dropDowns, setDropDowns] = useReducer( (oldstate,updates)=>({...oldstate,...updates}),{
        breakfast:false,
        lunch:false,
        dinner:false,
        exercise1:false,
        exercise2:false,
        exercise3:false
    })
    const handleChange = (event, name) => {
        let obj ={}
        obj[name]=event.target.value
        setCamp(obj);
    };
  
    const handleClose = (name) => {
        let obj ={}
        obj[name]=false;
        setDropDowns(obj)
    };
  
    const handleOpen = (name) => {
        let obj ={}
        obj[name]=true;
        setDropDowns(obj)
    };

    useEffect(()=>{
        ApiServices.getRegularPlan(id,date).then((data)=>{
            if(data){
               setUpdate({update:true,_id:data.data._d})  
                setCamp(data.data)
            }
        }).catch((err)=>{})

    },[])
    useEffect(()=>{
      exerciseServices.getAllExercises().then((data)=>{  
        setExerciseList(data.data.data)
      }).catch((err)=>{})

  },[])  
    useEffect(()=>{
        ApiServices.getBreakfast().then((data)=>{
            setBreakfastList(data.data)
        }).catch((err)=>{})
    },[])
    useEffect(()=>{
        ApiServices.getLaunch().then((data)=>{
            setLunchList(data.data)
        }).catch((err)=>{})
    },[])
    useEffect(()=>{
        ApiServices.getDinner().then((data)=>{
            setDinnerList(data.data)
        }).catch((err)=>{})

    },[])
    
    function sumbitRegularPlan(){
        ApiServices.regularPlan(camp).then((data)=>{
            history.push("/admin/camps");
        }).catch((err)=>{
            console.log(err);
        })
    }
    function updateRegularPlan(){
        ApiServices.updateRegularPlan(id, date,camp).then((data)=>{
            history.push("/admin/camps");
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <div className={"container"}>
            <h2>{new Date(date).toLocaleDateString() + ' Plan for regular users'}</h2>
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"    className="text-light">Breakfat</InputLabel>
        <Select
           className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.breakfast}
          onClose={()=>handleClose('breakfast')}
          onOpen={ ()=> handleOpen('breakfast')}
          value={camp.breakfast}
          onChange={e=>  handleChange(e,'breakfast')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              breakfastList.length>0&&
                  breakfastList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }

        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"    className="text-light">Lunch</InputLabel>
        <Select
           className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.lunch}
          onClose={()=>handleClose('lunch')}
          onOpen={ ()=> handleOpen('lunch')}
          value={camp.lunch}
          onChange={e=>  handleChange(e,'lunch')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              lunchList.length>0&&
                  lunchList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"    className="text-light">Dinner</InputLabel>
        <Select
           className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.dinner}
          onClose={()=>handleClose('dinner')}
          onOpen={ ()=> handleOpen('dinner')}
          value={camp.dinner}
          onChange={e=>  handleChange(e,'dinner')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              dinnerList.length>0&&
                  dinnerList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
    
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"    className="text-light">Exercise 1</InputLabel>
        <Select
           className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.exercise1}
          onClose={()=>handleClose('exercise1')}
          onOpen={ ()=> handleOpen('exercise1')}
          value={camp.exercise1}
          onChange={e=>  handleChange(e,'exercise1')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              exerciseList.length>0&&
              exerciseList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
    
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"    className="text-light">Exercise 2</InputLabel>
        <Select
           className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.exercise2}
          onClose={()=>handleClose('exercise2')}
          onOpen={ ()=> handleOpen('exercise2')}
          value={camp.exercise2}
          onChange={e=>  handleChange(e,'exercise2')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              exerciseList.length>0&&
              exerciseList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" className="text-light">Exercise 3</InputLabel>
        <Select
         className="text-light"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={dropDowns.exercise3}
          onClose={()=>handleClose('exercise3')}
          onOpen={ ()=> handleOpen('exercise3')}
          value={camp.exercise3}
          onChange={e=>  handleChange(e,'exercise3')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              exerciseList.length>0&&
              exerciseList.map((item)=><MenuItem value={item._id}>{item.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
    
    {
        update.update && <button className={"btn btn-primary col-md-2 mt-5 mr-4"} onClick={updateRegularPlan}>Update</button>
    }
    {
        !update.update && <button className={"btn btn-primary col-md-2 mt-5 mr-4"} onClick={sumbitRegularPlan}>Save</button>
    }
        </div>
        </>
    )
}