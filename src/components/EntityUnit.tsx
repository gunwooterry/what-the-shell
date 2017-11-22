import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { EntityType, Entity, Folder } from '../containers/Entity';

interface EntityUnitProps {
  entity: Entity;
  directoryHandler: (target: Folder) => void;
}

interface EntityUnitStates {
  selected: boolean;
}

const iconStyle = {
  margin: 'auto',
  display: 'block',
};

class EntityUnit extends React.Component<EntityUnitProps, EntityUnitStates> {
  constructor(props: EntityUnitProps) {
    super(props);
    this.state = {
      selected: false,
    };
    this.select = this.select.bind(this);
  }

  select() {
    this.setState({
      selected: true,
    });
  }

  render() {
    const entity = this.props.entity;
    const folderIcon = <Icon name={'folder'} color={'blue'} size={'huge'} style={iconStyle}/>;
    const fileIcon = <Icon name={'file'} size={'huge'} style={iconStyle}/>;

    return (
      <div
        onClick={this.select}
        onDoubleClick={() => entity.type === EntityType.folder && this.props.directoryHandler(entity as Folder)}
        style={{ backgroundColor: this.state.selected ? '#AAAAAA' : '#FFFFFF' }}
      >
        {entity.type === EntityType.folder ? folderIcon : fileIcon}
        <span style={{ display: 'block' }}>{entity.name}</span>
      </div>
    );
  }
}

export default EntityUnit;
