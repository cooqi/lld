import router from "../main";
import query from "../../utils/mysql";
import { TheContext } from "../../utils/interfaces";
import { apiSuccess, apiFail } from "../../utils/apiResult";
// 获取type内容
router.get("/common/dict/getType", async (ctx: TheContext) => {
   
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from type_dict`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results:[]
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 获取func-type内容
router.get("/common/dict/getFuncType", async (ctx: TheContext) => {
   
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from func_type_dict`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results:[]
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})