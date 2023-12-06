import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function ClassMemberCard({ member }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
                onClick={() => {
                    if (session?.user?.id === member?.id) {
                        router.push('/account')
                    } else {
                        router.push(`/profile/${member?.id}`)
                    }
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar
                        alt={member?.profile?.name}
                        src={member?.profile?.avatar}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Typography
                        variant="h5"
                        component="div"
                        noWrap
                        maxWidth={'100%'}
                    >
                        {member?.profile?.name || 'unknown name'}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {member?.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ClassMemberCard
