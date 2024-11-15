import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
 const navigate = useNavigate();

 return (
   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
     <div className="w-[500px] p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
       {/* Header Section */}
       <div className="text-center mb-8">
         <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
         <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
       </div>

       {/* Form */}
       <form className="space-y-6">
         {/* Email Field */}
         <div>
           <label htmlFor="email" className="block text-sm font-medium text-gray-600">
             Email address
           </label>
           <input
             id="email"
             name="email"
             type="email"
             className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             placeholder="Enter your email"
           />
         </div>

         {/* Password Field */}
         <div>
           <label htmlFor="password" className="block text-sm font-medium text-gray-600">
             Password
           </label>
           <div className="relative">
             <input
               id="password"
               name="password"
               type="password"
               className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Enter your password"
             />
             <button
               type="button"
               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
             >
               <Eye size={20} />
             </button>
           </div>
         </div>

         {/* Remember Me & Forgot Password */}
         <div className="flex items-center justify-between">
           <div className="flex items-center">
             <input
               id="rememberMe"
               name="rememberMe"
               type="checkbox"
               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
             />
             <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
               Remember me
             </label>
           </div>
           <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
             Forgot password?
           </a>
         </div>

         {/* Submit Button */}
         <div>
           <button
             type="button"
             onClick={() => navigate('/dashboard')}
             className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
           >
             Sign In
           </button>
         </div>

         {/* Register Link */}
         <div className="text-sm text-center mt-4">
           <span className="text-gray-500">Don&apos;t have an account? </span>
           <a href="/signup" className="text-blue-600 hover:text-blue-500">
             Register
           </a>
         </div>
       </form>
     </div>
   </div>
 );
};

export default Login;