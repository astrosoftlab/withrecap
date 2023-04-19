import React, { ButtonHTMLAttributes } from 'react'

import { Link } from 'react-router-dom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`text-sm flex items-center gap-2 px-4 py-2 font-semibold bg-gray-100 rounded-[12px] ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

interface ButtonThumbsProps {
  checked?: boolean // fill blue if checked
  to?: string // supposed to work as Link if this is set
  onClick?: () => void
}

export function ThumbsUp({ checked = false, to = '#', ...props }: ButtonThumbsProps) {
  return (
    <Link
      to={to}
      className={`pointer flex justify-center items-center w-[28px] h-[28px] rounded-full ${
        checked ? 'bg-[#40A3FF]' : 'border-solid border border-gray-100 hover:border-gray-200'
      }`}
      {...props}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.576172 10.7715C0.576172 11.5371 0.719727 12.2344 1.00684 12.8633C1.29395 13.4876 1.68359 13.9844 2.17578 14.3535C2.67253 14.7227 3.23535 14.9072 3.86426 14.9072H5.02637C4.40202 14.3923 3.9349 13.7747 3.625 13.0547C3.3151 12.3346 3.16471 11.5485 3.17383 10.6963C3.17839 10.1175 3.23535 9.58431 3.34473 9.09668C3.45866 8.60905 3.61133 8.16243 3.80273 7.75684C3.9987 7.34668 4.22201 6.96615 4.47266 6.61523H3.59082C3.02116 6.61523 2.50846 6.79753 2.05273 7.16211C1.59701 7.52669 1.23698 8.02344 0.972656 8.65234C0.708333 9.28125 0.576172 9.98763 0.576172 10.7715ZM4.26758 10.71C4.26302 11.4118 4.3929 12.0612 4.65723 12.6582C4.92611 13.2507 5.30892 13.7656 5.80566 14.2031C6.30241 14.6452 6.89941 14.987 7.59668 15.2285C8.2985 15.4746 9.0778 15.5999 9.93457 15.6045H10.9258C11.3815 15.609 11.7871 15.5954 12.1426 15.5635C12.5026 15.5316 12.792 15.4906 13.0107 15.4404C13.3617 15.3538 13.6556 15.1966 13.8926 14.9688C14.1296 14.7454 14.248 14.4538 14.248 14.0938C14.248 13.9661 14.2344 13.8499 14.207 13.7451C14.1842 13.6449 14.1523 13.5537 14.1113 13.4717C14.0703 13.4033 14.0794 13.3555 14.1387 13.3281C14.3848 13.2005 14.583 13.0273 14.7334 12.8086C14.8838 12.5898 14.959 12.3392 14.959 12.0566C14.959 11.7331 14.8815 11.4551 14.7266 11.2227C14.6719 11.1452 14.6855 11.0837 14.7676 11.0381C14.9362 10.9196 15.0706 10.7578 15.1709 10.5527C15.2757 10.3477 15.3281 10.1221 15.3281 9.87598C15.3281 9.69368 15.3008 9.52051 15.2461 9.35645C15.196 9.18783 15.1276 9.05111 15.041 8.94629C14.9818 8.88704 14.9863 8.82552 15.0547 8.76172C15.1732 8.65234 15.262 8.51107 15.3213 8.33789C15.3851 8.16471 15.417 7.97559 15.417 7.77051C15.417 7.50618 15.3532 7.26465 15.2256 7.0459C15.1025 6.82715 14.9339 6.65397 14.7197 6.52637C14.5055 6.39876 14.264 6.33496 13.9951 6.33496H11.418C11.1309 6.33496 10.903 6.27116 10.7344 6.14355C10.5658 6.01139 10.4814 5.83366 10.4814 5.61035C10.4814 5.37793 10.543 5.09993 10.666 4.77637C10.7891 4.44824 10.9303 4.09961 11.0898 3.73047C11.2539 3.35677 11.3975 2.98079 11.5205 2.60254C11.6481 2.22428 11.7119 1.86882 11.7119 1.53613C11.7119 1.16243 11.6003 0.863932 11.377 0.640625C11.1582 0.417318 10.8802 0.305664 10.543 0.305664C10.265 0.305664 10.0371 0.389974 9.85938 0.558594C9.68164 0.727214 9.50618 0.975586 9.33301 1.30371C8.79525 2.34733 8.19596 3.30436 7.53516 4.1748C6.87435 5.04525 6.26595 5.84733 5.70996 6.58105C5.37728 7.01855 5.10384 7.44694 4.88965 7.86621C4.68001 8.28092 4.52507 8.71842 4.4248 9.17871C4.32454 9.63444 4.27214 10.1449 4.26758 10.71Z"
          fill={checked ? '#fff' : '#69707A'}
        />
      </svg>
    </Link>
  )
}

export function ThumbsDown({ checked = false, to = '#', ...props }: ButtonThumbsProps) {
  return (
    <Link
      to={to}
      className={`pointer flex justify-center items-center w-[28px] h-[28px] rounded-full ${
        checked ? 'bg-[#40A3FF]' : 'border-solid border border-gray-100 hover:border-gray-200'
      }`}
      {...props}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.4238 5.34375C15.4238 4.57812 15.278 3.88314 14.9863 3.25879C14.6992 2.62988 14.3073 2.13086 13.8105 1.76172C13.3184 1.39258 12.7601 1.20801 12.1357 1.20801H10.9736C11.598 1.71842 12.0674 2.33594 12.3818 3.06055C12.6963 3.7806 12.8467 4.56673 12.833 5.41895C12.8285 5.99772 12.7669 6.53092 12.6484 7.01855C12.5345 7.50618 12.3796 7.95508 12.1836 8.36523C11.9922 8.77083 11.7712 9.14909 11.5205 9.5H12.4023C12.9766 9.5 13.4915 9.31771 13.9473 8.95312C14.403 8.58398 14.763 8.08496 15.0273 7.45605C15.2917 6.82715 15.4238 6.12305 15.4238 5.34375ZM11.7461 5.39844C11.7598 4.69661 11.6322 4.05176 11.3633 3.46387C11.099 2.87142 10.7161 2.35645 10.2148 1.91895C9.71354 1.48145 9.11198 1.13965 8.41016 0.893555C7.70833 0.647461 6.92676 0.522135 6.06543 0.517578L5.08105 0.510742C4.62077 0.506185 4.21061 0.519857 3.85059 0.551758C3.49512 0.579102 3.20801 0.620117 2.98926 0.674805C2.6429 0.761393 2.34896 0.91862 2.10742 1.14648C1.87044 1.36979 1.75195 1.66146 1.75195 2.02148C1.75195 2.14909 1.76562 2.2653 1.79297 2.37012C1.82031 2.47038 1.85221 2.56152 1.88867 2.64355C1.92969 2.70736 1.92057 2.75521 1.86133 2.78711C1.61523 2.91471 1.41699 3.08789 1.2666 3.30664C1.11621 3.52539 1.04102 3.77376 1.04102 4.05176C1.04102 4.37988 1.12077 4.66016 1.28027 4.89258C1.3304 4.96549 1.31673 5.02702 1.23926 5.07715C1.07064 5.19564 0.933919 5.35742 0.829102 5.5625C0.724284 5.76758 0.671875 5.99316 0.671875 6.23926C0.671875 6.42155 0.69694 6.59701 0.74707 6.76562C0.801758 6.92969 0.872396 7.06413 0.958984 7.16895C1.02279 7.22819 1.01823 7.28971 0.945312 7.35352C0.83138 7.45833 0.742513 7.59961 0.678711 7.77734C0.614909 7.95052 0.583008 8.13965 0.583008 8.34473C0.583008 8.60905 0.644531 8.85059 0.767578 9.06934C0.895182 9.28809 1.06608 9.46126 1.28027 9.58887C1.49902 9.71647 1.74056 9.78027 2.00488 9.78027H4.58887C4.87598 9.78027 5.10384 9.84635 5.27246 9.97852C5.44108 10.1061 5.52539 10.2816 5.52539 10.5049C5.52539 10.7373 5.46159 11.0176 5.33398 11.3457C5.21094 11.6693 5.06738 12.0179 4.90332 12.3916C4.74382 12.7607 4.60254 13.1322 4.47949 13.5059C4.35645 13.8841 4.29492 14.2396 4.29492 14.5723C4.29492 14.9505 4.4043 15.249 4.62305 15.4678C4.84635 15.6911 5.12663 15.8027 5.46387 15.8027C5.7373 15.8027 5.96289 15.7184 6.14062 15.5498C6.31836 15.3857 6.49382 15.1396 6.66699 14.8115C7.20931 13.7633 7.81087 12.8063 8.47168 11.9404C9.13249 11.07 9.74089 10.2656 10.2969 9.52734C10.625 9.08984 10.8939 8.66374 11.1035 8.24902C11.3177 7.83431 11.4749 7.39909 11.5752 6.94336C11.68 6.48307 11.737 5.9681 11.7461 5.39844Z"
          fill={checked ? '#fff' : '#69707A'}
        />
      </svg>
    </Link>
  )
}