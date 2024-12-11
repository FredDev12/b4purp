"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[725],{189:(e,t,r)=>{r.d(t,{A:()=>p});var o=r(641),a=r(33);const s={class:"input-field"},l=["for"],i=["id","type","value","placeholder","disabled","maxlength","minlength"],n={key:1,class:"error-message"};function d(e,t,r,d,c,u){return(0,o.uX)(),(0,o.CE)("div",s,[e.label?((0,o.uX)(),(0,o.CE)("label",{key:0,for:e.id,class:"input-label"},(0,a.v_)(e.label),9,l)):(0,o.Q3)("",!0),(0,o.Lk)("input",{id:e.id,type:e.type,value:e.modelValue,placeholder:e.placeholder,disabled:e.disabled,maxlength:e.maxlength,minlength:e.minlength,onInput:t[0]||(t[0]=t=>e.$emit("update:modelValue",t.target.value)),class:"input"},null,40,i),e.errorMessage?((0,o.uX)(),(0,o.CE)("p",n,(0,a.v_)(e.errorMessage),1)):(0,o.Q3)("",!0)])}const c=(0,o.pM)({name:"InputField",props:{id:{type:String,required:!0},label:{type:String,required:!0},type:{type:String,default:"text"},modelValue:{type:String,required:!0},placeholder:{type:String,required:!0},disabled:{type:Boolean,required:!1,default:!1},maxlength:{type:Number,required:!1},minlength:{type:Number,required:!1},errorMessage:{type:String,required:!1}}});var u=r(262);const h=(0,u.A)(c,[["render",d],["__scopeId","data-v-493aa504"]]),p=h},581:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var o=r(641),a=r(751),s=r(33);const l=r.p+"img/wadoria.3bfa1d30.png",i={class:"login-container"},n={class:"form-group"},d={key:0,class:"error"};function c(e,t,r,c,u,h){const p=(0,o.g2)("InputField"),g=(0,o.g2)("ButtonComponent"),m=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("div",i,[t[4]||(t[4]=(0,o.Lk)("img",{src:l,alt:"Logo",class:"logo"},null,-1)),t[5]||(t[5]=(0,o.Lk)("h1",null,"Connexion",-1)),(0,o.Lk)("form",{onSubmit:t[2]||(t[2]=(0,a.D$)(((...t)=>e.handleLogin&&e.handleLogin(...t)),["prevent"]))},[(0,o.Lk)("div",n,[(0,o.bF)(p,{type:"email",id:"email",modelValue:e.email,"onUpdate:modelValue":t[0]||(t[0]=t=>e.email=t),label:"Email","error-message":e.emailError,placeholder:"Entrez votre email",required:""},null,8,["modelValue","error-message"]),(0,o.bF)(p,{type:"password",id:"password",modelValue:e.password,"onUpdate:modelValue":t[1]||(t[1]=t=>e.password=t),label:"Mot de passe","error-message":e.passwordError,placeholder:"Entrez votre mot de passe",required:""},null,8,["modelValue","error-message"])]),(0,o.bF)(g,{type:"submit",class:"btn-primary",disabled:e.loading},{default:(0,o.k6)((()=>[e.loading?((0,o.uX)(),(0,o.CE)(o.FK,{key:0},[(0,o.eW)("Chargement...")],64)):((0,o.uX)(),(0,o.CE)(o.FK,{key:1},[(0,o.eW)("Se connecter")],64))])),_:1},8,["disabled"]),e.apiError?((0,o.uX)(),(0,o.CE)("p",d,(0,s.v_)(e.apiError),1)):(0,o.Q3)("",!0)],32),(0,o.Lk)("p",null,[(0,o.bF)(m,{to:"/requestPasswordReset"},{default:(0,o.k6)((()=>t[3]||(t[3]=[(0,o.eW)("Mot de passe oublié ?")]))),_:1})])])}var u=r(953),h=r(220),p=r(866),g=r(523),m=r(189);const f=(0,o.pM)({name:"Login",components:{ButtonComponent:g.A,InputField:m.A},setup(){const e=(0,h.rd)(),t=(0,p.P)(),r=(0,u.KR)(""),o=(0,u.KR)(""),a=(0,u.KR)(""),s=(0,u.KR)(""),l=(0,u.KR)(""),i=(0,u.KR)(!1),n=async()=>{if(i.value=!0,a.value="",s.value="",l.value="",!d(r.value))return a.value="Veuillez entrer une adresse email valide.",void(i.value=!1);if(o.value.length<6)return s.value="Le mot de passe doit contenir au moins 6 caractères.",void(i.value=!1);try{await t.performLogin(r.value,o.value),e.push({name:"Dashboard"})}catch(n){console.error(n),l.value=n.message||"Role non reconnu."}finally{i.value=!1}},d=e=>{const t=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;return t.test(e)};return{email:r,password:o,emailError:a,passwordError:s,apiError:l,handleLogin:n,loading:i}}});var v=r(262);const y=(0,v.A)(f,[["render",c]]),k=y},866:(e,t,r)=>{r.d(t,{P:()=>s});var o=r(615),a=r(6);const s=(0,o.nY)({id:"auth",state:()=>({token:localStorage.getItem("token")||null,userProfile:null,users:[],userList:[],listContract:[],listClients:[],listManagers:[],listUtilisateurs:[],isAuthenticated:!!localStorage.getItem("token")}),actions:{async performLogin(e,t){try{const r=await(0,a.iD)(e,t),o=r.token,s=r.role,l=r.id;this.token=o,localStorage.setItem("token",o),localStorage.setItem("role",s),localStorage.setItem("id",l),this.isAuthenticated=!0,await this.fetchUserProfile(o),await this.fetchUsers(s,o),await this.fetchContract(s,o)}catch(r){throw console.error("Authentication failed:",r),new Error("Login failed")}},async fetchUserProfile(e){if(e)try{const t=await(0,a.VM)(e);this.userProfile=t,this.isAuthenticated=!0}catch(t){console.error("Failed to fetch user profile:",t),this.isAuthenticated=!1}else console.error("No token provided")},async fetchUsers(e,t){if(t)try{const r=await(0,a.ZZ)(e,t);console.log("storage",r),this.users=r,console.log(this.users),this.isAuthenticated=!0}catch(r){console.error("Failed to fetch user:",r),this.isAuthenticated=!1}else console.error("No token provided")},async fetchUsersBY(e,t){if(t)try{const r=await(0,a.lo)(e,t);console.log("storage",r),this.userList=r,console.log("liste ",this.userList)}catch(r){console.error("Failed to fetch user:",r),this.isAuthenticated=!1}else console.error("No token provided")},async fetchContract(e,t){if(t)try{const r=await(0,a.PF)(e,t);console.log("storage",r),this.listContract=r,console.log("liste ",this.listContract)}catch(r){console.error("Failed to fetch user:",r),this.isAuthenticated=!1}else console.error("No token provided")},async performLogout(){if(this.token)try{await(0,a.y4)(this.token),this.isAuthenticated=!1,this.userProfile=null,localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("id")}catch(e){console.error("Failed to logout:",e)}else console.error("No token provided")},async addUser(e){},async fetchUsersByRole(e){if(this.token)try{const t=await(0,a.ZZ)(e,this.token);"client"===e?this.listClients=t:"manager"===e?this.listManagers=t:this.listUtilisateurs=t}catch(t){console.error(`Failed to fetch ${e}s:`,t)}else console.error("No token provided")}}})}}]);
//# sourceMappingURL=725.c851b026.js.map