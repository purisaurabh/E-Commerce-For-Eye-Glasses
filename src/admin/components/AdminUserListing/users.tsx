
import { Table } from 'antd';
import { useDeleteUserMutation, useGetAllUserQuery } from '../../../api/userOperationApi';
import Spinner from '../../../assets/Circles-menu-3.gif'
import ErrorPage from '../../../components/pages/ErrorPage';
import { notify } from '../../../utils/utils';

const Users: React.FC = () => {
    const { data: userData, isLoading, error } = useGetAllUserQuery();
    console.log({ userData })
    const [deleteUser] = useDeleteUserMutation()

    const handleDelete = async (userId: number) => {
        const id = String(userId);
        try {
            await deleteUser(id).unwrap();
            notify("success", "User Deleted Successfully", 0);
        } catch (error) {
            console.log({ error })
            notify("error", "Failed to delete user", 0);
        }
    }

    if (error) {
        return <ErrorPage />
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobile_no',
            key: 'mobile_no',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Postal Code',
            dataIndex: 'postal_code',
            key: 'postal_code',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete User
                </button>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            <h1 className="text-2xl font-bold mb-5">Users</h1>
            {isLoading ? (
                <img src={Spinner} alt="Loading..." />
            ) : !userData || userData.length === 0 ? (
                <div className='flex justify-center item-center text-center font-bold'>No users available</div>
            ) : (
                <div className='w-full overflow-x-auto'>
                    <Table columns={columns} dataSource={userData} rowKey="id" pagination={{ pageSize: 6 }} />
                </div>
            )

            }
        </div>
    )
}

export default Users
