export default {
    path:"/hello"
    ,getComponent(location,callback){
        require.ensure([],(require)=>{
            callback(null,require("pages/hello.jsx").default);
        });
    }
};
