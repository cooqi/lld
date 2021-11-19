
var iconv = require('iconv-lite');
var fs = require('fs');
let path=require('path')
export function loadjson(filepath:string)
{
    var data;
 
    try{
        let path_file=path.resolve(__dirname, "../../public/"+filepath)
        var jsondata = fs.readFileSync(path_file)//iconv.decode(fs.readFileSync(path_file, "binary"), "utf8");
 
        if(jsondata){
            data = JSON.parse(jsondata);
        }

    }
    catch(err)
    {
        console.log('err',err);
    }
 
    return data;
}
 
 
export function savejson(filepath:string, data:any)
{
    var datastr = JSON.stringify(data, null, 4);
    let path_file=path.resolve(__dirname, "../../public/"+filepath)
 
    if (datastr)
    {
        try{
            fs.writeFileSync(path_file, datastr);
        }
        catch(err)
        {
            
        }
    }
}