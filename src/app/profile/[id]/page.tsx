import { userService } from "@/services/user/user-service"; 

type PageProps = { params: { id: string } };

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const user = await userService.getUserById(id);
    
    if (!user) {
        return <div>Error: User not found</div>;
    }

    return (<div className="text-green-600">Profile Page for {id}, {user.name}, {user.email}, {user.surname}, {user.nickname}, {user.phoneNumber} </div>);
};

export default Page;