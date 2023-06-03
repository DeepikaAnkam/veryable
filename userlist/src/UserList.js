import React, {useState} from 'react';
import usersData from './users.json';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as ExpandMoreIcon } from './icons/expand_more.svg';
import { ReactComponent as ExpandLessIcon } from './icons/expand_less.svg';

const UserList = () => {
    const [expandedUserId, setExpandedUserId] = useState(null);

    const handleCardClick = (userId) => {
        setExpandedUserId(userId === expandedUserId ? null : userId);
    }

    return (
        <div>
            {usersData.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    expanded={user.id === expandedUserId}
                    onCardClick={handleCardClick}
                />
            ))}
        </div>
    );
};

const UserCard = ({user, expanded, onCardClick}) => {
    const {id, firstName, lastName, role, email, street, city, state, zip, phone, createdAt, lastLoggedIn} = user;

    const handleClick = () => {
        onCardClick(id);
    };

    const getIconColor = () => {
        switch (role) {
            case 'Administrator':
                return '#2081C3';
            case 'User':
                return '#68AAAB';
            case 'Viewer':
                return '#7E7E7E';
            default:
                return '#7E7E7E';
        }
    }



return (
    <>
        <div 
            style={{
                backgroundColor: '#FFFFFF',
                margin: expanded ? '16px 12px 0 12px' : '16px 12px 16px 12px',
                height: '80px',
                display: 'flex',
                alignItems: 'center'
            }}
            onClick={handleClick}
        > 
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '12px'
            }} >
                <UserIcon fill={getIconColor()}/>
            </div> 
            <div style={{marginLeft: '12px'}}>
                <div style={{fontSize: '12px', fontWeight: '600', color: '#4A4A4A'}}>{`${firstName} ${lastName}`}</div>
                <div style={{fontSize: '10px',  color: '#4A4A4A'}}>{role}</div>
                <div style={{fontSize: '10px',  color: '#7E7E7E'}}>{email}</div>
            </div> 
            <div style={{float: "right", marginLeft: "auto", marginRight: "12px"}}>
          {expanded ? <ExpandLessIcon/> :
            <ExpandMoreIcon/>
          }
        </div>
      </div>
      <div style={{
        display: expanded ? 'flex' : 'none' , backgroundColor: '#FFFFFF',
        margin: expanded ? '0 12px 16px 12px' : '16px 12px 16px 12px',
        height: '190px',
        alignItems: 'center'
      }}>
        <div style={{paddingLeft: '48px'}}>
            <p>
                <div style={{fontSize: '10px', fontWeight: 'bold'}}>Address</div>
                <div style={{fontSize: '10px'}}>{`${street}, ${city}, ${state}, ${zip}`}</div>
            </p>
        </div>

      </div>


  
    </>
    );
  };

export default UserList;