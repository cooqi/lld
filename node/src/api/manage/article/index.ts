import router from "../../main";
import query from "../../../utils/mysql";
import { TheContext } from "../../../utils/interfaces";
import { apiSuccess, apiFail } from "../../../utils/apiResult";
import utils from "../../../utils";
// 获取所有列表
router.get("/article/getList", async (ctx: TheContext) => {
   
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
    if(params.title) where+=` and title like '%${params.title}%'`
    if(params.type&&params.type!='0') where+=' and type='+params.type  //type 1文章 2通知
    if(params.status) where+=' and status='+params.status  //status 1显示  0隐藏
    if(params.tag&&params.tag.length) {//标签
        for(let i=0;i<params.tag.length;i++){
            where+=` and tag like '%${params.tag[i]}%' `
        }
    }

    let sql=`select * from publish_article`+where+` order by top desc,createTime desc  limit ${ start}, ${params.pageSize}`
    const res = await query(sql)

   // console.log('获取',res);
   let sqlCount=`select count(*) as total  from publish_article ${where}`
   const resCount = await query(sqlCount)

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       if(length){
        res.results.map((item:any)=>{
            if(item.tag) item.tag=item.tag.split(',')
            return item
        })
       }
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
router.get("/article/getArticleById", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.id){
        return ctx.body = apiSuccess({}, "id必传", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from publish_article where id="${params.id}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results[0]:{}
       if(data.tag) data.tag=data.tag.split(',')
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 添加列表
router.post("/article/add", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // if (!params.content) {
    //     return ctx.body = apiSuccess({}, "添加的列表内容不能为空！", 400);
    // }

    // 写入列表
    let creatTime=new Date()
    let editTime=null
    console.log('bug',params.tag)
    let tag=''
    if(params.tag&&params.tag.length) tag=params.tag.join(',')
    const res = await query("insert into publish_article(title, type,tag, status,content,top,createTime,editTime) values(?,?,?,?,?,?,?,?)", [params.title,params.type,tag,params.status, params.content, params.top,creatTime,editTime])
    
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
router.post("/article/modify", async (ctx) => {
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.id) {
        return ctx.body = apiSuccess({}, "列表id不能为空", 400);
    }


    // 修改列表
    let editTime=utils.formatDate()
    let tag=''
    if(params.tag&&params.tag.length) tag=params.tag.join(',')

    const res = await query(`update publish_article set title="${params.title}",type="${params.type}",tag="${tag}",status="${params.status}",content="${params.content}",top="${params.top}", editTime="${editTime}" where id="${params.id}"`)

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
router.post("/article/delete", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // 从数据库中删除
    const res = await query(`delete from publish_article where id=${params.id}`)
    
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