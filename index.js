const express=require("express");
const axios=require("axios");
const app=express();
app.use(express.json());

if (!process.env.WEBHOOK) {
 console.error("WEBHOOK environment variable belum diatur.");
}

const WEBHOOK = process.env.WEBHOOK;
app.get("/",(_,res)=>res.send("Avalog Webhook Online"));
app.post(["/sale", "/purchase"], async (req, res) => {
 const d=req.body;
 console.log("Webhook menerima:", d);
 const embed={title:"🛒 Avatar Catalog Purchase",color:0x00ff66,fields:[
 {name:"Experience ID",value:String(d.experienceId||"Unknown")},
 {name:"Item ID",value:String(d.itemId||"Unknown"),inline:true},
 {name:"Item Type",value:String(d.itemType||"Unknown"),inline:true},
 {name:"Price",value:`${d.robuxPrice||0} Robux`,inline:true},
 {name:"Units Sold",value:String(d.unitsSold||1),inline:true},
 {name:"Job ID",value:String(d.jobId||"Unknown")}
 ],timestamp:new Date()};
 try{await axios.post(WEBHOOK,{embeds:[embed]});res.json({success:true});}
 catch(e){res.status(500).json({success:false,error:e.message});}
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Avalog Webhook berjalan di port ${PORT}`));
