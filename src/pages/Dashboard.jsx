import { useContext, useState } from 'react'
import Filter from '../components/filter'
import { UserContext } from '../contextApi/UserContext';
import AddUserModal from '../components/AddUserModal';

const Dashboard = () => {
  const { users, loading } = useContext(UserContext);
  const [visibleUsers, setVisibleUsers] = useState(10);
  const currentUsers = users.slice(0, visibleUsers);
  const {showAddUserModal} = useContext(UserContext);
  
  if(loading) {
    return (
      <div className='flex justify-center items-center h-[90vh]'>
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
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
                    <td className="border px-4 py-2">-</td>
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