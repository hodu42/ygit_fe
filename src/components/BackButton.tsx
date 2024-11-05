import {useNavigate} from "react-router-dom";
import {Icon} from "@chakra-ui/react";
import {TbArrowBackUp} from "react-icons/tb";
import React from "react";

export const BackButton:React.FC = () => {
    const navigate = useNavigate();
    return (
            <Icon
                as={TbArrowBackUp}
                boxSize={90}
                color='#0dcbe4'
                display="inline-flex"
                position='absolute'
                top='30px'
                left='50px'
                onClick={()=> navigate(-1)}
                _hover={{cursor: 'pointer',
                        color: '#0DA3E4'
                }}
            />
    )
}