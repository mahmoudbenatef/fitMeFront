import { useParams } from "react-router-dom";
import { useEffect , useState, useReducer } from "react";
import {ApiServices} from "../../../API/ApiServices";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory} from "react-router-dom";

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

export default function ExceptionalUserPlan() {
    const [update, setUpdate]= useState({update:false,_id:null});
    const history = useHistory();
    let { id } = useParams();
    let {date} = useParams();
    let {userID} = useParams();

    const classes = useStyles();
    const [breakfastList, setBreakfastList]=useState([]);
    const [lunchList, setLunchList]=useState([]);
    const [dinnerList, setDinnerList]=useState([]);

    const [camp, setCamp] = useReducer( (oldstate,updates)=>({...oldstate,...updates}),{
        user:userID,
        date:date,
        camp:id,
        breakfast:'',
        lunch:'',
        dinner:'',
    });
    const [dropDowns, setDropDowns] = useReducer( (oldstate,updates)=>({...oldstate,...updates}),{
        breakfast:false,
        lunch:false,
        dinner:false,
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
        ApiServices.getExceptionalPlan(id,date,userID).then((data)=>{
            if(data){
               setUpdate({update:true,_id:data.data._d})  
                setCamp(data.data)
            }
        }).catch((err)=>{})

    },[])
    useEffect(()=>{
        ApiServices.getBreakfast().then((data)=>{
            setBreakfastList(data.data)
        }).catch((err)=>{})

    },[])

    // 
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
    
    function sumbitExceptionalPlan(){
        ApiServices.exceptionalPlan(camp).then((data)=>{
            history.push("/admin/camps");
        }).catch((err)=>{
            console.log(err);
        })
    }

    function updateEceptionalPlan(){
        ApiServices.updateExceptionalPlan(id, date,camp, userID).then((data)=>{
            history.push("/admin/camps");
        }).catch((err)=>{
                history.push("/admin/camps");
        })
    }
    
    return (
        <>
        <div className={"container"}>
            <h2>{new Date(date).toLocaleDateString() + ' Plan for exceptional user'}</h2>
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Breakfat</InputLabel>
        <Select
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
        <InputLabel id="demo-controlled-open-select-label">Lunch</InputLabel>
        <Select
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
        <InputLabel id="demo-controlled-open-select-label">Dinner</InputLabel>
        <Select
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
    {
        update.update && <button className={"btn btn-primary col-md-2 mt-5 mr-4"} onClick={updateEceptionalPlan}>Update</button>
    }
    {
        !update.update && <button className={"btn btn-primary col-md-2 mt-5 mr-4"} onClick={sumbitExceptionalPlan}>Save</button>
    }
        </div>
        </>
    )
}