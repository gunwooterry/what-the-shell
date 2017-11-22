import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { EntityType, Entity, Folder } from '../containers/Entity';

interface EntityUnitProps {
  entity: Entity;
  directoryHandler: (target: Folder) => void;
}

const iconStyle = {
  margin: 'auto',
  display: 'block',
};

class EntityUnit extends React.Component<EntityUnitProps> {
  constructor(props: EntityUnitProps) {
    super(props);
    this.moveTo = this.moveTo.bind(this);
  }

  moveTo() {
    const entity = this.props.entity;
    if (entity.type === EntityType.folder) {
      this.props.directoryHandler(entity as Folder);
    }
  }

  render() {
    const icon =
      this.props.entity.type === EntityType.folder ?
        <Icon name={'folder'} color={'blue'} size={'huge'} style={iconStyle}/> :
        <Icon name={'file'} size={'huge'} style={iconStyle}/>;

    return (
      <div onDoubleClick={this.moveTo}>
        {icon}
        <span style={{ display: 'block' }}>{this.props.entity.name}</span>
      </div>
    );
  }
}

export default EntityUnit;
