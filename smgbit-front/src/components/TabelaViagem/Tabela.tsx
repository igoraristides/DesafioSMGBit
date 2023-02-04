import { CheckboxVisibility, classNamesFunction, DetailsList, IconButton, SelectionMode, Spinner, SpinnerSize, Stack, styled, Text, Image } from '@fluentui/react';
import React from 'react';
import { getStyles } from './Tabela.styles';
import { ITabelaProps, ITabelaStyles, ITabelaStylesProps } from './Tabela.types';
import SemDados from '../../assets/nenhumDado.png';

const ITENS_POR_PAGINA = 10;

const getClassNames = classNamesFunction<ITabelaStylesProps, ITabelaStyles>();

const Tabela: React.FC<ITabelaProps> = (props) => {
  const { styles, theme, itens, colunas, titulo, carregando } = props;

  const [paginaAtual, setPaginaAtual] = React.useState(0);

  const inicio = paginaAtual * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;

  const classNames = getClassNames(styles, { theme });

  const todosItens = itens.slice(inicio, fim);

  return (
    <Stack verticalFill horizontalAlign="center" padding={15}>
      {titulo && <span className={classNames.labelTabela}>{titulo}</span>}

      <div className={classNames.tabelaB}>
        <DetailsList items={todosItens} columns={colunas} checkboxVisibility={CheckboxVisibility.hidden} selectionMode={SelectionMode.none} />

        {!carregando && todosItens.length === 0 && (
          <Stack className={classNames.imagem}>
            <Image src={SemDados} alt="logo" width={200} height={200} />
          </Stack>
        )}

        {carregando ? (
          <Spinner label="Carregando dados da tabela..." size={SpinnerSize.large} />
        ) : (
          <Stack horizontal horizontalAlign="space-between" styles={{ root: { padding: '10px 0' } }}>
            <Text>
              {inicio + 1}-{fim} de {itens.length}
            </Text>
            <Stack horizontal>
              <IconButton iconProps={{ iconName: 'ChevronLeft' }} disabled={paginaAtual === 0} onClick={() => setPaginaAtual(paginaAtual - 1)} />
              <IconButton iconProps={{ iconName: 'ChevronRight' }} disabled={fim >= itens.length} onClick={() => setPaginaAtual(paginaAtual + 1)} />
            </Stack>
          </Stack>
        )}
      </div>
    </Stack>
  );
};

export default styled<ITabelaProps, ITabelaStylesProps, ITabelaStyles>(Tabela, getStyles);
