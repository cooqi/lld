import router from "../../main";
import query from "../../../utils/mysql";
import { TheContext } from "../../../utils/interfaces";
import { apiSuccess, apiFail } from "../../../utils/apiResult";
import utils from "../../../utils";
// 获取所有列表
router.get("/dict/getListType", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     
    // console.log('获取',params);

    // 这里要开始查询
    let sql=`select * from type_dict`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length> 0 ? res.results:[]
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})


// 添加列表
router.post("/dict/addType", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.dict_name||!params.dict_val) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 写入列表
    
    
    const res = await query("insert into type_dict(dict_name, dict_val) values(?,?)", [params.dict_name,params.dict_val])
    
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
router.post("/dict/modifyType", async (ctx) => {
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.id) {
        return ctx.body = apiSuccess({}, "列表id不能为空", 201);
    }
    if (!params.dict_name||!params.dict_val) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 修改列表
    const res = await query(`update type_dict set dict_name="${params.dict_name}",dict_val="${params.dict_val}"  where id="${params.id}" `)

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
router.post("/dict/deleteType", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // 从数据库中删除
    const res = await query(`delete from type_dict where id=${params.id}`)
    
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


// 获取所有fun-type列表
router.get("/dict/getListFuncType", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     
    // console.log('获取',params);

    // 这里要开始查询
    let sql=`select * from func_type_dict`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length> 0 ? res.results:[]
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})


// 添加func-type列表
router.post("/dict/addFuncType", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.dict_name||!params.dict_val) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 写入列表
    
    
    const res = await query("insert into func_type_dict(dict_name, dict_val) values(?,?)", [params.dict_name,params.dict_val])
    
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

// 修改Func-type列表
router.post("/dict/modifyFuncType", async (ctx) => {
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.id) {
        return ctx.body = apiSuccess({}, "列表id不能为空", 201);
    }
    if (!params.dict_name||!params.dict_val) {
        return ctx.body = apiSuccess({}, "字典的name和内容都不能为空不能为空！", 202);
    }

    // 修改列表
    const res = await query(`update func_type_dict set dict_name="${params.dict_name}",dict_val="${params.dict_val}"  where id="${params.id}" `)

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

// 删除Func-type列表
router.post("/dict/deleteFuncType", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // 从数据库中删除
    const res = await query(`delete from func_type_dict where id=${params.id}`)
    
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