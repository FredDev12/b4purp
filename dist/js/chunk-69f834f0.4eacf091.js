(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69f834f0"],{"0da1":function(e,t,o){"use strict";o("7233")},"14f4":function(e,t,o){},3724:function(e,t,o){"use strict";var l=o("7a23");const r={for:"select",class:"select-label"},n=["id"],a=["value"];function c(e,t,o,c,i,s){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",null,[Object(l["createElementVNode"])("label",r,Object(l["toDisplayString"])(e.label),1),Object(l["withDirectives"])(Object(l["createElementVNode"])("select",{"onUpdate:modelValue":t[0]||(t[0]=t=>e.selectedOption=t),class:"gender-select",id:e.uniqueId},[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.options,e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("option",{key:e.value,value:e.value},Object(l["toDisplayString"])(e.label),9,a))),128))],8,n),[[l["vModelSelect"],e.selectedOption]])])}var i=Object(l["defineComponent"])({name:"SelectComponent",props:{modelValue:{type:String,required:!1},options:{type:Array,required:!0},label:{type:String,default:"Sélectionnez une option"},id:{type:String,default:""}},emits:["update:modelValue"],setup(e,{emit:t}){const o=Object(l["computed"])(()=>e.id||"select-"+Math.random().toString(36).substr(2,9)),r=Object(l["computed"])({get:()=>e.modelValue,set:e=>t("update:modelValue",e)});return{selectedOption:r,options:e.options,uniqueId:o}}}),s=(o("0da1"),o("6b0d")),d=o.n(s);const u=d()(i,[["render",c],["__scopeId","data-v-657b3cd4"]]);t["a"]=u},"5d04":function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var l=o("be92"),r=o("3a50");const n=Object(l["b"])({id:"auth",state:()=>({token:localStorage.getItem("token")||null,userProfile:null,users:[],userList:[],listClients:[],listManagers:[],listUtilisateurs:[],isAuthenticated:!!localStorage.getItem("token")}),actions:{async performLogin(e,t){try{const o=await Object(r["d"])(e,t),l=o.token,n=o.role;this.token=l,localStorage.setItem("token",l),localStorage.setItem("role",n),this.isAuthenticated=!0,await this.fetchUserProfile(l),await this.fetchUsers(n,l)}catch(o){throw console.error("Authentication failed:",o),new Error("Login failed")}},async fetchUserProfile(e){if(e)try{const t=await Object(r["a"])(e);this.userProfile=t,this.isAuthenticated=!0}catch(t){console.error("Failed to fetch user profile:",t),this.isAuthenticated=!1}else console.error("No token provided")},async fetchUsers(e,t){if(t)try{const o=await Object(r["c"])(e,t);console.log("storage",o),this.users=o,console.log(this.users)}catch(o){console.error("Failed to fetch user:",o),this.isAuthenticated=!1}else console.error("No token provided")},async fetchUsersBY(e,t){if(t)try{const o=await Object(r["b"])(e,t);console.log("storage",o),this.userList=o,console.log("liste ",this.userList)}catch(o){console.error("Failed to fetch user:",o),this.isAuthenticated=!1}else console.error("No token provided")},async performLogout(){if(this.token)try{await Object(r["e"])(this.token),this.isAuthenticated=!1,this.userProfile=null,localStorage.removeItem("token"),localStorage.removeItem("role")}catch(e){console.error("Failed to logout:",e)}else console.error("No token provided")},async addUser(e){},async fetchUsersByRole(e){if(this.token)try{const t=await Object(r["c"])(e,this.token);"client"===e?this.listClients=t:"manager"===e?this.listManagers=t:this.listUtilisateurs=t}catch(t){console.error(`Failed to fetch ${e}s:`,t)}else console.error("No token provided")}}})},7233:function(e,t,o){},8192:function(e,t,o){"use strict";var l=o("7a23");const r={class:"input-field"},n=["for"],a=["id","type","value","placeholder","disabled","maxlength","minlength"],c={key:1,class:"error-message"};function i(e,t,o,i,s,d){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",r,[e.label?(Object(l["openBlock"])(),Object(l["createElementBlock"])("label",{key:0,for:e.id,class:"input-label"},Object(l["toDisplayString"])(e.label),9,n)):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("input",{id:e.id,type:e.type,value:e.modelValue,placeholder:e.placeholder,disabled:e.disabled,maxlength:e.maxlength,minlength:e.minlength,onInput:t[0]||(t[0]=t=>e.$emit("update:modelValue",t.target.value)),class:"input"},null,40,a),e.errorMessage?(Object(l["openBlock"])(),Object(l["createElementBlock"])("p",c,Object(l["toDisplayString"])(e.errorMessage),1)):Object(l["createCommentVNode"])("",!0)])}var s=Object(l["defineComponent"])({name:"InputField",props:{id:{type:String,required:!0},label:{type:String,required:!0},type:{type:String,default:"text"},modelValue:{type:String,required:!0},placeholder:{type:String,required:!0},disabled:{type:Boolean,required:!1,default:!1},maxlength:{type:Number,required:!1},minlength:{type:Number,required:!1},errorMessage:{type:String,required:!1}}}),d=(o("be8d"),o("6b0d")),u=o.n(d);const m=u()(s,[["render",i],["__scopeId","data-v-424e3b7f"]]);t["a"]=m},"8b2b":function(e,t,o){"use strict";o("14f4")},"8c07":function(e,t,o){"use strict";var l=o("7a23");const r={class:"sidebar"},n=["href"];function a(e,t,o,a,c,i){return Object(l["openBlock"])(),Object(l["createElementBlock"])("aside",r,[Object(l["createElementVNode"])("nav",null,[Object(l["createElementVNode"])("ul",null,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.menuItems,e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("li",{key:e.name,class:Object(l["normalizeClass"])({active:e.active})},[Object(l["createElementVNode"])("a",{href:e.link},Object(l["toDisplayString"])(e.name),9,n)],2))),128))])])])}var c=Object(l["defineComponent"])({name:"SidebarComponent",props:{menuItems:{type:Array,required:!0}}}),i=(o("9261"),o("6b0d")),s=o.n(i);const d=s()(c,[["render",a],["__scopeId","data-v-74b7da77"]]);t["a"]=d},9261:function(e,t,o){"use strict";o("d558")},9529:function(e,t,o){"use strict";var l=o("7a23");const r={class:"image-upload-container"};function n(e,t,o,n,a,c){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",r,[Object(l["createElementVNode"])("input",{type:"file",onChange:t[0]||(t[0]=(...t)=>e.handleFileUpload&&e.handleFileUpload(...t)),accept:".png, .jpg, .jpeg, .csv",class:"file-input"},null,32)])}var a=Object(l["defineComponent"])({name:"ImageUpload",emits:["update:file"],setup(e,{emit:t}){const o=e=>{const o=e.target,l=o.files,r=l&&l[0];r&&t("update:file",r)};return{handleFileUpload:o}}}),c=(o("8b2b"),o("6b0d")),i=o.n(c);const s=i()(a,[["render",n],["__scopeId","data-v-923aba26"]]);t["a"]=s},b3b1:function(e,t,o){"use strict";o.r(t);var l=o("7a23"),r=o("c121"),n=o.n(r);const a={key:0,class:"profile"},c={class:"profile-container"},i={key:0,src:n.a,alt:"Profile Image",class:"profile-image"},s={class:"form-group"},d={key:1,class:"error"},u={key:1,class:"profile"};function m(e,t,o,r,n,m){const p=Object(l["resolveComponent"])("NavBar"),b=Object(l["resolveComponent"])("InputField"),f=Object(l["resolveComponent"])("ButtonComponent");return Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[Object(l["createVNode"])(p,{menuItems:e.filteredMenuItems},null,8,["menuItems"]),e.isAuthenticated?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",a,[Object(l["createElementVNode"])("main",c,[Object(l["createElementVNode"])("form",{class:"profile-form",onSubmit:t[6]||(t[6]=Object(l["withModifiers"])((...t)=>e.updateProfile&&e.updateProfile(...t),["prevent"]))},[e.imageUrl||e.defaultImage?(Object(l["openBlock"])(),Object(l["createElementBlock"])("img",i)):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn",onChange:t[0]||(t[0]=(...t)=>e.changePicture&&e.changePicture(...t))},"changer la photo",32),Object(l["createElementVNode"])("div",s,[Object(l["createVNode"])(b,{id:"name",label:"Nom",modelValue:e.form.name,"onUpdate:modelValue":t[1]||(t[1]=t=>e.form.name=t),type:"text",placeholder:"Nom",disabled:"",required:""},null,8,["modelValue"]),Object(l["createVNode"])(b,{id:"email",label:"Email",modelValue:e.form.email,"onUpdate:modelValue":t[2]||(t[2]=t=>e.form.email=t),type:"email",placeholder:"Votre email","error-message":e.emailError,disabled:"",required:""},null,8,["modelValue","error-message"]),Object(l["createVNode"])(b,{id:"password",label:"Mot de passe",modelValue:e.form.password,"onUpdate:modelValue":t[3]||(t[3]=t=>e.form.password=t),type:"password",placeholder:"Votre mot de passe","error-message":e.passwordError,disabled:"",required:""},null,8,["modelValue","error-message"]),Object(l["createVNode"])(b,{id:"confirmpassword",label:"Confirmez le mot de passe",modelValue:e.form.confirmPassword,"onUpdate:modelValue":t[4]||(t[4]=t=>e.form.confirmPassword=t),type:"password",placeholder:"Confirmez votre mot de passe",disabled:"",required:""},null,8,["modelValue"]),Object(l["createVNode"])(b,{id:"role",label:"role",modelValue:e.form.role,"onUpdate:modelValue":t[5]||(t[5]=t=>e.form.role=t),type:"text",placeholder:"Votre role",disabled:"",required:""},null,8,["modelValue"])]),Object(l["createVNode"])(f,{type:"submit",class:"btn-primary",disabled:e.loading},{default:Object(l["withCtx"])(()=>[e.loading?(Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],{key:0},[Object(l["createTextVNode"])("Chargement...")],64)):(Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],{key:1},[Object(l["createTextVNode"])("Update")],64))]),_:1},8,["disabled"]),e.apiError?(Object(l["openBlock"])(),Object(l["createElementBlock"])("p",d,Object(l["toDisplayString"])(e.apiError),1)):Object(l["createCommentVNode"])("",!0)],32)])])):(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",u,t[7]||(t[7]=[Object(l["createElementVNode"])("p",null,"Veuillez vous connecter pour modifier votre profil.",-1)])))],64)}var p=o("8c07"),b=o("e4c3"),f=o("d000"),O=o("8192"),j=o("3724"),g=o("9529"),h=o("6605"),k=o("5d04"),v=o("3a50"),y=Object(l["defineComponent"])({name:"Profile",components:{SidebarComponent:p["a"],ButtonComponent:b["a"],InputField:O["a"],SelectComponent:j["a"],ImageUpload:g["a"],NavBar:f["a"]},props:{entityType:{type:String,required:!0}},setup(e){const t=Object(k["a"])(),o=localStorage.getItem("role")||"Utilisateur",r=localStorage.getItem("token"),n=Object(l["ref"])([]),a=Object(l["ref"])([]),c=(Object(h["c"])(),Object(l["reactive"])({name:t.userProfile.name,email:t.userProfile.email,password:"",confirmPassword:"",file:null,role:o})),i=t.isAuthenticated,s=Object(l["ref"])(""),d=Object(l["ref"])("../assets/user.png"),u=null,m=Object(l["ref"])("../assets/user.png"),p=e=>{c.file=e},b=Object(l["ref"])(""),f=Object(l["ref"])(""),O=Object(l["ref"])(""),j=Object(l["ref"])(!1);async function g(e){const t=e.target.files[0],o=new FormData;o.append("photo",t);try{Object(v["f"])(o)}catch(l){console.error("Error uploading file:",l)}}function y(){console.log("Form submitted")}Object(l["onMounted"])(async()=>{if(r){const e=await Object(v["a"])(r);n.value=e,console.log(n.value)}else console.error("Authentication token is missing")});const V=()=>{if(t.token)try{alert("Profile updated successfully!")}catch(e){console.error("Failed to update profile:",e),alert("Failed to update profile.")}else console.error("Authentication token is missing")},E=()=>{console.log("Change profile picture")},B=Object(l["ref"])([{name:"Tableau de Bord",link:"/dashboard",active:!1,visibleTo:["Admin","Client","Manager","Utilisateur"]},{name:"Liste des Utilisateurs",link:"/liste",active:!1,visibleTo:["Admin","Client","Manager"]},{name:"Mon Profil",link:"/profile",active:!0,visibleTo:["Admin","Client","Manager","Utilisateur"]}]),N=B.value.filter(e=>e.visibleTo.includes(o));return{role:o,changePicture:E,isAuthenticated:i,menuItems:B,users:a,form:c,updateProfile:V,emailError:b,handleFile:p,passwordError:f,apiError:O,loading:j,previewImage:u,defaultImage:m,filteredMenuItems:N,handleFileUpload:g,imageUrl:s,submitForm:y,defaultImageUrl:d}}}),V=o("6b0d"),E=o.n(V);const B=E()(y,[["render",m]]);t["default"]=B},be8d:function(e,t,o){"use strict";o("d2e2")},c121:function(e,t,o){e.exports=o.p+"img/user.399c5f70.png"},d000:function(e,t,o){"use strict";var l=o("7a23");const r={class:"navbar"};function n(e,t,o,n,a,c){const i=Object(l["resolveComponent"])("router-link");return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",null,[Object(l["createElementVNode"])("header",r,[t[1]||(t[1]=Object(l["createElementVNode"])("div",{class:"logo"},[Object(l["createElementVNode"])("a",{href:"/"},"MonLogo")],-1)),Object(l["createElementVNode"])("div",{class:Object(l["normalizeClass"])(["menu",{active:e.isMenuOpen}])},[Object(l["createElementVNode"])("ul",null,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.menuItems,e=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("li",{key:e.name,class:Object(l["normalizeClass"])({active:e.active})},[Object(l["createVNode"])(i,{class:"link",to:e.link},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(e.name),1)]),_:2},1032,["to"])],2))),128))])],2),Object(l["createElementVNode"])("div",{class:Object(l["normalizeClass"])(["menu",{active:e.isMenuOpen}])},[Object(l["createElementVNode"])("ul",null,[Object(l["createElementVNode"])("li",null,[Object(l["createElementVNode"])("a",{href:"#",onClick:t[0]||(t[0]=Object(l["withModifiers"])((...t)=>e.logout&&e.logout(...t),["prevent"]))},"Déconnexion")])])],2)])])}var a=o("6605"),c=Object(l["defineComponent"])({name:"NavbarComponent",props:{menuItems:{type:Array,required:!0}},setup(){const e=Object(a["c"])(),t=()=>{localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("role"),e.push("/")};return{logout:t}},data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen}}}),i=o("6b0d"),s=o.n(i);const d=s()(c,[["render",n]]);t["a"]=d},d2e2:function(e,t,o){},d558:function(e,t,o){}}]);
//# sourceMappingURL=chunk-69f834f0.4eacf091.js.map