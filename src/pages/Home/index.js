import React from 'react';
import styled from 'styled-components';
import {WithOrganizations} from '../../containers/WithOrganization';
import {H1} from '../../components/H1';

import {CONFIG} from '../../config';


class Home extends React.Component {

    renderError = (error) => {
        console.log(error);

        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        );
    };

    render() {

        return (
            <Wrapper>
                <H1>Home</H1>
                <WithOrganizations onError={this.renderError} organizationId={CONFIG.ORGANIZATION_ID}>
                    {({loading, data}) => {
                        if (loading) {
                            return <p>Loading</p>;
                        }

                        return (
                            <div>
                                <p>ID: {data.organization.id}</p>
                                <p>Name: {data.organization.name}</p>
                            </div>
                        );
                    }}
                </WithOrganizations>
            </Wrapper>
        );
    }
}


const Wrapper = styled.div`
   padding: 24px;
`;

export default Home;
