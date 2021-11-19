import router from "../main";
import query from "../../utils/mysql";
import { TheContext } from "../../utils/interfaces";
import { apiSuccess, apiFail } from "../../utils/apiResult";
// 获取tag内容
router.get("/common/dict/getTags", async (ctx: TheContext) => {
   
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;

     if(!params.name){
        return ctx.body = apiSuccess({}, "字典名必传", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from tags_dict where name="${params.name}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results[0]:{}
       let dict=data.tags.split(',')
        bodyResult = apiSuccess(dict);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 获取tag内容
router.get("/common/dict/getTagsAll", async (ctx: TheContext) => {
   
    /** 返回结果 */
    let bodyResult = null;
    
  
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from tags_dict`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results:[]
       let dict=data.map((item:any)=>{
            item.tags=item.tags.split(',')
            return item
       })
        bodyResult = apiSuccess(dict);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})