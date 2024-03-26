import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({title, pageRef} : {title:string, pageRef:string}){
    return(
        <Link className={'flex items-center space-x-10 font-serif text-white font-thin text-base'} href={pageRef}>
            {title}
        </Link>
    );
}