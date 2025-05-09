import { useSearchParams, useNavigate } from "react-router-dom"

//The tag "button" each one has it´s own filter based on subjects etc.
//Generated in TagList.jsx

export default function Tag({ label, type, selected}) {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        //Reset to first page on any filter change
        params.set('page', '1');

        //Toggle this tag in URL params (type = 'lang' or 'level')
        const values = params.getAll(type);
        if(values.includes(label)) {
            //Remove tag
            params.delete(type);
            values
                .filter(v => v !== label)
                .forEach(v => params.append(type, v));
        } else {
            //Add tag
            params.append(type, label);
        }

        // Navigate back to frontpage with updated filters
        navigate({pathname: '/', search: params.toString()});
    };

    return(
        <button
            className={`tag-button ${selected? 'selected bg-green-300 text-green-900' : 'bg-green-800 text-green-50'}
                p-4
                m-2
                rounded-[2rem]
                cursor-pointer
                uppercase
                font-semibold
                text-sm
                shadow-xl
                transform
                hover:scale-105
                transition duration-200
            `}
            onClick={handleClick}
        >
            {label}
        </button>
    );
}