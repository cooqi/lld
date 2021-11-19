import router from "../../main";
import query from "../../../utils/mysql";
import { TheContext } from "../../../utils/interfaces";
import { apiSuccess, apiFail } from "../../../utils/apiResult";
import utils from "../../../utils";

const columns= [
    { label: '一般', value: 'common' },
    { label: '重要', value: 'important' },
    { label: '生日', value: 'birthday' },
    { label: '过年啦', value: 'happyNewYear' },
    { label: '黑色纪念', value: 'black' }
  ]

  // 获取type字典
router.get("/web/typeDict", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     bodyResult = apiSuccess(columns);
    
    ctx.body = bodyResult;
})

// 获取所有列表
router.get("/web/getList", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.pageNo||!params.pageSize){
        return ctx.body = apiSuccess({}, "分页信息必填", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
    var start = (params.pageNo - 1) * params.pageSize ||0;

    let where=' where 1=1'
    if(params.thing) where+=` and things like '%${params.thing}%'`
    if(params.time) where+=` and time = ${params.time}`
    if(params.timeMD) where+=` and dateTime = '${params.timeMD}'`
    if(params.type) where+=` and type = '${params.type}'`

    let sql=`select * from Memorabilia`+where+` order by time desc limit ${ start}, ${params.pageSize}`
    const res = await query(sql)

   // console.log('获取',res);
   let sqlCount='select count(*) as total  from Memorabilia' + where 
   const resCount = await query(sqlCount)

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       if(length){
        res.results.map((item:any)=>{
            let things=JSON.parse(item.things)
            if(things.length){
                things=things.map((v:any)=>{
                    v.value = decodeURIComponent(v.value)
                    return v
                })
            }
            item.things=things
            item.remark=decodeURIComponent(item.remark)
            item.time=utils.formatDate(item.time,'Y/M/D')
            if(item.type){
                let d=columns.filter(dict=>dict.value==item.type)
                item.typeName=d.length?d[0].label:''
            }
            return item
        })
       }
        bodyResult = apiSuccess({
            list: length> 0 ? res.results : [] ,
            totalPage:Math.ceil(resCount.results[0].total/params.pageSize),
            pageNo:params.pageNo,
            pageSize:params.pageSize
        });
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 获取所有列表--仅时间
router.get("/web/getListToTime", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
    
    // console.log('获取',params);

    // 这里要开始连表查询

    let where=' where 1=1'
    if(params.things) where+=` and title like '%${params.things}%'`


    let sql=`select id,time,dateTime,year,type from Memorabilia`+where
    const res = await query(sql)

 

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       if(length){
        res.results.map((item:any)=>{
            item.time=utils.formatDate(item.time,'Y/M/D')
            return item
        })
       }
        bodyResult = apiSuccess({
            list: length> 0 ? res.results : [] 
        });
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})



// 获取当天周年内容
router.get("/web/getAnniversaryByMD", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.timeMD){
        return ctx.body = apiSuccess({}, "时间必传", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from Memorabilia where dateTime="${params.timeMD}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       if(length){
           res.results.map((item:any)=>{
                let things=JSON.parse(item.things)
                if(things.length){
                    things=things.map((v:any)=>{
                        v.value = decodeURIComponent(v.value)
                        return v
                    })
                }
                item.things=things
                item.remark=decodeURIComponent(item.remark)
                item.time=utils.formatDate(item.time,'Y/M/D')
                if(item.type){
                    let d=columns.filter(dict=>dict.value==item.type)
                    item.typeName=d.length?d[0].label:''
                }
                return item
            })
       }
       let data={
           list:res.results
       }
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})


// 获取当天day相关内容
router.get("/web/getDataAboutToday", async (ctx: TheContext) => {
   
    const state = ctx["the_state"];
    /** 返回结果 */
    let bodyResult = null;
    
     /** 接收参数 */
     const params: any = ctx.query;
     if(!params.timeToday){
        return ctx.body = apiSuccess({}, "时间必传", 202);
     }
    
    // console.log('获取',params);

    // 这里要开始连表查询
 
    let sql=`select * from Memorabilia where day="${params.timeToday}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        let length= res.results.length
        if(length){
            res.results.map((item:any)=>{
                 let things=JSON.parse(item.things)
                 if(things.length){
                    things=things.map((v:any)=>{
                        v.value = decodeURIComponent(v.value)
                        return v
                    })
                }
                 item.things=things
                 item.remark=decodeURIComponent(item.remark)
                 item.time=utils.formatDate(item.time,'Y/M/D')
                 if(item.type){
                    let d=columns.filter(dict=>dict.value==item.type)
                    item.typeName=d.length?d[0].label:''
                }
                 return item
             })
        }
        let data={
            list:res.results
        }
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 添加列表
router.post("/web/addData", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!(params.time&&params.things&&params.things.length)) {
        return ctx.body = apiSuccess({}, "添加的时间和内容都不能为空！", 202);
    }

    //录入时间不允许重复添加
    let sql=`select * from Memorabilia where time="${params.time}"`
    const resTime = await query(sql)
    if(resTime.state === 1){
        let length= resTime.results.length
        if(length){
            return ctx.body = apiSuccess({}, params.time+"已经添加过，请勿重复添加，如有新的事件请做修改！", 202);
        }
    }

    // 写入列表
    
    let things=''
    if(params.things&&params.things.length) things=JSON.stringify(params.things) 
 
    //对时间做处理
    let  dateTime=utils.formatDate(params.time,'M/D')
    let year=utils.formatDate(params.time,'Y')
    let day=utils.formatDate(params.time,'D')

    const res = await query("insert into Memorabilia(time,dateTime, year,day,things,type,remark) values(?,?,?,?,?,?,?)", [params.time,dateTime,year,day,things,params.type,params.remark])
    
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

// 根据id查详情
router.get("/web/getDateById", async (ctx: TheContext) => {
   
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
 
    let sql=`select * from Memorabilia where id="${params.id}"`
    const res = await query(sql)

   // console.log('获取',res);

    if (res.state === 1) {
        // console.log("/getList 查询", res.results);
       let length= res.results.length
       let data=length?res.results[0]:null
       if(data){
           let things=JSON.parse(data.things)
           if(things.length){
            things=things.map((v:any)=>{
                v.value = decodeURIComponent(v.value)
                return v
            })
        }
           data.things=things
           data.remark=decodeURIComponent(data.remark)
           if(data.type){
                let d=columns.filter(dict=>dict.value==data.type)
                data.typeName=d.length?d[0].label:''
            }
       }
        bodyResult = apiSuccess(data);
    } else {
        ctx.response.status = 500;
        bodyResult = apiFail(res.msg, 500, res.error);
    }
    
    ctx.body = bodyResult;
})

// 修改列表
router.post("/web/modifyData", async (ctx) => {
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    if (!params.id) {
        return ctx.body = apiSuccess({}, "列表id不能为空", 201);
    }
    if (!(params.time&&params.things&&params.things.length)) {
        return ctx.body = apiSuccess({}, "添加的时间和内容都不能为空！", 202);
    }

    // 修改列表
    let things=''
    if(params.things&&params.things.length) things=JSON.stringify(params.things) 

    //对时间做处理
    let  dateTime=utils.formatDate(params.time,'M/D')
    let year=utils.formatDate(params.time,'Y')
    let day=utils.formatDate(params.time,'D')
    const res = await query(`update Memorabilia set time="${params.time}",dateTime="${dateTime}",year="${year}",day="${day}",things='${things}',type="${params.type}",remark="${params.remark}"  where id=${params.id} `)

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
router.post("/web/deleteData", async (ctx: TheContext) => {
    const state = ctx["the_state"];
    /** 接收参数 */
    const params = ctx.request.body;
    /** 返回结果 */
    let bodyResult = null;

    // 从数据库中删除
    const res = await query(`delete from Memorabilia where id=${params.id}`)
    
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