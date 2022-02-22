import styled from 'styled-components';
import { Button } from 'antd';

const base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}em;
`;

export default styled(base)({});
