interface Props {
    className?: string,
    shadow?: boolean
}

const DeleteIcon: React.FC<Props> = ({ className, shadow }) => (
    <svg className={className ? className : undefined} height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter={shadow ? "url(#filter0_d_2_5)": undefined}>
            <path className='delete-path' fillRule="evenodd" clipRule="evenodd" d="M11.5355 11.5355C9.58291 13.4882 9.58291 16.654 11.5355 18.6066L39.8198 46.8909L11.5355 75.1751C9.58291 77.1278 9.58291 80.2936 11.5355 82.2462C13.4882 84.1988 16.654 84.1988 18.6066 82.2462L46.8909 53.9619L75.1751 82.2462C77.1278 84.1988 80.2936 84.1988 82.2462 82.2462C84.1988 80.2936 84.1988 77.1278 82.2462 75.1751L53.9619 46.8909L82.2462 18.6066C84.1988 16.654 84.1988 13.4882 82.2462 11.5355C80.2936 9.58291 77.1278 9.58291 75.1751 11.5355L46.8909 39.8198L18.6066 11.5355C16.654 9.58291 13.4882 9.58291 11.5355 11.5355Z" fill="black"/>
        </g>
        <defs>
        <filter id="filter0_d_2_5" x="0.0710683" y="0.0710678" width="93.6396" height="93.6396" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_5"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_5" result="shape"/>
        </filter>
        </defs>
    </svg>
);

export default DeleteIcon;