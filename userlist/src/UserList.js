import React, {useState} from 'react';
import usersData from './users.json';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as ExpandMoreIcon } from './icons/expand_more.svg';
import { ReactComponent as ExpandLessIcon } from './icons/expand_less.svg';

const UserList = () => {
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [sortOption, setSortOption] = useState('');

    const handleCardClick = (userId) => {
        setExpandedUserId(userId === expandedUserId ? null : userId);
    }

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
      };
    
      const sortUsers = (users) => {
        if (sortOption === 'name') {
          return users.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (sortOption === 'id') {
          return users.slice().sort((a, b) => a.id - b.id);
        } else if (sortOption === 'role') {
          return users.slice().sort((a, b) => a.role.localeCompare(b.role));
        } else {
          return users;
        }
      };
    

      return (
        <div>
         
         <div style={{ marginLeft: '12px', marginTop: '16px' }}>
            <select value={sortOption} onChange={handleSortOptionChange}>
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="id">ID</option>
              <option value="role">Role</option>
            </select>
          </div>
          {sortUsers(usersData).map((user) => (
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

    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + (date.getHours() >= 12 ? 'PM' : 'AM');
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
            <p>
                <div style={{fontSize: '10px', fontWeight: 'bold'}}>Phone</div>
                <div style={{fontSize: '10px'}}>{`${phone}`}</div>
            </p>
            <p>
                <div style={{fontSize: '10px', fontWeight: 'bold'}}>Created At</div>
                <div style={{fontSize: '10px'}}>{getFormattedDate(new Date(createdAt))}</div>
            </p>
            <p>
                <div style={{fontSize: '10px', fontWeight: 'bold'}}>Last Logged In</div>
                <div style={{fontSize: '10px'}}>{getFormattedDate(new Date(lastLoggedIn))}</div>
            </p>
        </div>

      </div>

  
    </>
    );
  };

export default UserList;