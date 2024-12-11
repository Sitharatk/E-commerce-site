import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth, provider, signInWithPopup } from "../firebase.js";
import { UserContext } from '../Context/UserContext.jsx';

function Registration() {
  const [Data, setData] = useState({
    username: '',
    email: '',
    password: '',
    cart: [],
    order: [],
  });
  const [cPassword, setcPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("http://localhost:4000/users")
      .then((response) => {
        const existingUsers = response.data;
        if (!existingUsers.some(user => user.email === Data.email)) {
          if (Data.password === cPassword) {
            axios.post("http://localhost:4000/users", Data)
              .then(() => {
                toast("User successfully registered");
                navigate('/login');
              })
              .catch((err) => console.log(err));
          } else {
            toast("Passwords do not match");
          }
        } else {
          toast("User already exists");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Set the current user after Google sign-in
        setCurrentUser({
          username: user.displayName,
          email: user.email,
          cart: [],
          order: [],
        });
  
        // Optionally, save user to backend if required
        axios.post("http://localhost:4000/users", {
          username: user.displayName,
          email: user.email,
          password: "", // No password for Google users
          cart: [],
          order: [],
        })
          .then(() => {
            toast("Signed in with Google");
            // Redirect to the user's login page
            navigate('/');
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.error("Google Sign-In Error", error);
        toast.error("Google Sign-In failed");
      });
  };
  
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen"
      style={{
        background: 'url(https://i.pinimg.com/736x/88/ed/5e/88ed5e9a13cdce632516e620fc400e23.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="w-full sm:w-5/6 md:w-2/3 lg:w-1/3 bg-white rounded-lg shadow-lg p-4 sm:p-6"
        style={{
          background: 'url(https://static.vecteezy.com/system/resources/thumbnails/017/301/346/small/soft-orange-brown-watercolor-background-color-splashing-watercolor-abstract-wet-hand-drawn-for-wallpaper-card-greeting-poster-design-cover-invitation-illustration-free-vector.jpg) center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center mb-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#522815] font-cinzel">Sign Up</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              value={Data.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={Data.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={Data.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={cPassword}
              onChange={(e) => setcPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#522815] text-white py-2 rounded-md font-semibold hover:bg-[#c48c70]"
          >
            Signup
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-[#522815] text-white py-2 rounded-md font-semibold hover:bg-[#c48c70]"
          >
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-[#522815] font-bold underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;


// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function Registration() {
//   const [Data, setData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     cart: [],
//     order: []
//   });
//   const [cPassword, setcPassword] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...Data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.get("http://localhost:4000/users")
//       .then((response) => {
//         const existingUsers = response.data;
//         if (!existingUsers.some(user => user.email === Data.email)) {
//           if (Data.password === cPassword) {
//             axios.post("http://localhost:4000/users", Data)
//               .then(() => {
//                 toast("User successfully registered");
//                 navigate('/login');
//               })
//               .catch((err) => console.log(err));
//           } else {
//             toast("Passwords do not match");
//           }
//         } else {
//           toast("User already exists");
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div
//       className="flex items-center justify-center w-full min-h-screen"
//       style={{
//         background: 'url(https://i.pinimg.com/736x/88/ed/5e/88ed5e9a13cdce632516e620fc400e23.jpg) no-repeat center center fixed',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div
//         className="w-full sm:w-5/6 md:w-2/3 lg:w-1/3 bg-white rounded-lg shadow-lg p-4 sm:p-6"
//         style={{
//           background: 'url(https://static.vecteezy.com/system/resources/thumbnails/017/301/346/small/soft-orange-brown-watercolor-background-color-splashing-watercolor-abstract-wet-hand-drawn-for-wallpaper-card-greeting-poster-design-cover-invitation-illustration-free-vector.jpg) center',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="text-center mb-4">
//           <h3 className="text-2xl sm:text-3xl font-bold text-[#522815] font-cinzel">Sign Up</h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={Data.username}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//               placeholder="Username"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={Data.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={Data.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               type="password"
//               id="confirm-password"
//               name="confirmPassword"
//               value={cPassword}
//               onChange={(e) => setcPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//               placeholder="Confirm Password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#522815] text-white py-2 rounded-md font-semibold hover:bg-[#c48c70]"
//           >
//             Signup
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Already have an account? <Link to="/login" className="text-[#522815] font-bold underline">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Registration