import { useContext, useState } from 'react'
import Filter from '../components/filter'
import { UserContext } from '../contextApi/UserContext';
import AddUserModal from '../components/AddUserModal';

const Dashboard = () => {
  const { users, loading } = useContext(UserContext);
  const [visibleUsers, setVisibleUsers] = useState(10);
  const {showAddUserModal, setShowAddUserModal, setUserIdToEdit, deleteUser, setIsEdit, searchText} = useContext(UserContext);  

  const filteredUsers = users.filter(user => {
    const text = searchText.toLowerCase();
    return (
    user.id.toString().includes(text) ||
    user.name.toLowerCase().includes(text) ||
    user.username.toLowerCase().includes(text) ||
    user.email.toLowerCase().includes(text)
    )
  })

  const currentUsers = filteredUsers.slice(0, visibleUsers);

  if(loading) {
    return (
      <div className='flex justify-center items-center h-[90vh]'>
        <span 
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" 
        role="status">
        </span>
      </div>
    )
  } else {
      return (
      <div className='mt-16 relative'>
        <Filter />
        {
          <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${showAddUserModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            <AddUserModal />
          </div>
        }
        <hr className='mt-6 mb-2' />
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Avatar</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      <button 
                      onClick={() => {
                        setUserIdToEdit(user.id);
                        setIsEdit(true);
                        setShowAddUserModal(true);
                      }}
                      className='edit_button text-blue-600 mr-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>

                      <button 
                      onClick={() => deleteUser(user.id)}
                      className='text-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="6">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {visibleUsers < users.length && (
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-black"
                onClick={() => setVisibleUsers(prev => prev + 10)}
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </div>
    )
  }

}

export default Dashboard