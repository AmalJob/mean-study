exports.func = ( code, data ,req, res)=>{
    console.log("hhhhh",code,data);
 return  res.status(code).json(data)
}