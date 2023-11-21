import React from 'react'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

function ClassList({ classes }) {
    return (
        <>
            <Typography variant="h4" component="div">
                Shared Classes:
            </Typography>
            <Typography variant="body2" component="div" display={'inline'}>
                {classes.map((classItem) => (
                    <Typography
                        variant="body2"
                        component="div"
                        display={'inline'}
                    >
                        <Link href={`/classes/${classItem.id}`}>
                            {classItem.name}
                        </Link>{' '}
                    </Typography>
                ))}
            </Typography>
        </>
    )
}

export default ClassList
