import router from "../../main";
import query from "../../../utils/mysql";
import { TheContext } from "../../../utils/interfaces";
import { apiSuccess, apiFail } from "../../../utils/apiResult";
import utils from "../../../utils";
// 获取所有列表
router.get("/dict/getListTag", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.page||!params.pageSize){
        return ctx.body = apiSuccess({}, "分页信息必填", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
    var start = (params.page - 1) * params.pageSize ||0;

    let where=' where 1=1'
    if(params.name) where+=` and title like '%${params.name}%'`


    let sql=`select * from tags_dict`+where+` limit ${ start}, ${params.pageSize}`
    const res = await query(sql)

   // console.log('获取',res);
   let sqlCount='select count(*) as total  from tags_dict' + where
   const resCount = await query(sqlCount)

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
        bodyResult = apiSuccess({
            list: length> 0 ? res.results : [] ,
            total:resCount.results[0].total,
            page:params.page,
            pageSize:params.pageSize
        });
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 获取单条内容
router.get("/dict/getTagById", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.id){
        return ctx.body = apiSuccess({}, "字典id必传", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from tags_dict where id="${params.id}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results[0]:{}
       data.tags=data.tags.split(',')
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 添加列表
router.post("/dict/addTag", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.name||!params.tags.length) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 写入列表
    
    let tag=''
    if(params.tags&&params.tags.length) tag=params.tags.join(',')
    const res = await query("insert into tags_dict(name, tags) values(?,?)", [params.name,tag])
    
    console.log("写入列表", res);

    if (res.state === 1) {
        bodyResult = apiSuccess({
            id: res.results.insertId
        }, "添加成功");
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 修改列表
router.post("/dict/modifyTag", async (ctx) => {
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.id) {
        return ctx.body = apiSuccess({}, "列表id不能为空", 201);
    }
    if (!params.name||!params.tags.length) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 修改列表
    let tag=''
    if(params.tags&&params.tags.length) tag=params.tags.join(',')

    const res = await query(`update tags_dict set name="${params.name}",tags="${tag}"  where id="${params.id}" `)

    console.log("修改列表", res);

    if (res.state === 1) {
        if (res.results.affectedRows > 0) {
            bodyResult = apiSuccess({}, "修改成功");
        } else {
            bodyResult = apiSuccess({}, "列表id不存在", 400);
        }
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }

    ctx.body = bodyResult;
})

// 删除列表
router.post("/dict/deleteTag", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // 从数据库中删除
    const res = await query(`delete from tags_dict where id=${params.id}`)
    
    console.log("从数据库中删除", res);

    if (res.state === 1) {
        if (res.results.affectedRows > 0) {
            bodyResult = apiSuccess({}, "删除成功");
        } else {
            bodyResult = apiSuccess({}, "当前列表id不存在或已删除", 400);
        }
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }

    ctx.body = bodyResult;
})