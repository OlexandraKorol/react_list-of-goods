import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

// type ReorderOptions = {
//   sortType: SortType,
//   isReversed: boolean,
// };

// Use this function in the render to prepare goods
// export function getReorderedGoods(
//   goods: string[],
//   { sortType, isReversed }: ReorderOptions,
// ) {
//   // To avoid the original array mutation
//   const visibleGoods = [...goods];

//   // Sort and reverse goods if needed
//   if (isReversed) {
//     visibleGoods.reverse()
//   }

//   visibleGoods.sort((good1: string, good2: string) => {
//     switch (sortType) {
//       case SortType.ALPHABET:
//         return good1.localeCompare(good2)

//       case SortType.LENGTH:
//         return good1.length - good2.length

//       default:
//         return 0
//     }
//   })

//   // eslint-disable-next-line no-console
//   console.log(sortType, isReversed);

//   return visibleGoods;
// };

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state: State = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  reverse = () => {
    this.setState((state) => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByAlphapet = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  sortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  reset = () => {
    this.setState({ sortType: SortType.NONE, isReversed: false });
  };

  render() {
    const { isReversed, sortType } = this.state;

    const visibleGoods = [...goodsFromServer];

    visibleGoods.sort((good1: string, good2: string) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleGoods.reverse();
    }

    return (
      <div className="section content box">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button is-info', { 'is-light': sortType !== SortType.ALPHABET },
            )}
            onClick={this.sortByAlphapet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-succes', { 'is-light': sortType !== SortType.LENGTH },
            )}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning', { 'is-light': isReversed !== true },
            )}
            onClick={this.reverse}
          >
            Reverse
          </button>

          {(isReversed || sortType !== SortType.NONE)
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={this.reset}
              >
                Reset
              </button>
            )
            : null}

        </div>
        <ul>
          {visibleGoods.map((good: string) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
