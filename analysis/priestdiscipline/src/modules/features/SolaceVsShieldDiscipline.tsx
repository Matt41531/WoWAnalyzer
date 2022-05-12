import { Trans } from '@lingui/macro';
import { formatThousands } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellIcon, SpellLink } from 'interface';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { RemoveBuffEvent, CastEvent } from 'parser/core/Events';
import { Options } from 'parser/core/Module';
import BoringValue from 'parser/ui/BoringValueText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

import './SolaceVsShieldDiscipline.scss';

class SolaceVsShieldDiscipline extends Analyzer {
  consumedShields = 0;
  solaceCasts = 0;
  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(SPELLS.POWER_WORD_SOLACE_TALENT);
    if (!this.active) {
      return;
    }
    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(SPELLS.POWER_WORD_SHIELD),
      this.onRemoveBuff,
    );
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.POWER_WORD_SOLACE_TALENT),
      this.onSolaceCast,
    );
  }

  onRemoveBuff(event: RemoveBuffEvent) {
    if (event.absorb && event.absorb > 0) {
      return;
    }
    this.consumedShields += 1;
  }

  onSolaceCast(event: CastEvent) {
    this.solaceCasts += 1;
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(13)}
        size="flexible"
        category={STATISTIC_CATEGORY.GENERAL}
        tooltip={
          <>
            The value for <SpellLink id={SPELLS.POWER_WORD_SOLACE_TALENT.id} /> also includes the
            mana cost of <SpellLink id={SPELLS.SMITE.id} />
          </>
        }
      >
        <BoringValue
          label={
            <>
              {' '}
              <h6>
                <SpellLink id={SPELLS.SHIELD_DISCIPLINE_TALENT.id} /> vs{' '}
                <SpellLink id={SPELLS.POWER_WORD_SOLACE_TALENT.id} />
              </h6>
            </>
          }
        >
          <div className="flex solace-value">
            <div className="flex-sub icon" id="solace-talent-icon">
              <SpellIcon id={SPELLS.POWER_WORD_SOLACE_TALENT.id} />
            </div>
            <div className="flex-main value">
              {formatThousands(this.solaceCasts * 700)}
              <br />
              <small>
                <Trans id="shaman.restoration.manaTideTotem.statistic.manaRestored">
                  Mana restored from Solace
                </Trans>
              </small>
            </div>
          </div>
          <div className="flex solace-value">
            <div className="flex-sub icon" id="solace-talent-icon">
              <SpellIcon id={SPELLS.SHIELD_DISCIPLINE_TALENT.id} />
            </div>
            <div className="flex-main value">
              {formatThousands(this.consumedShields * 250)}
              <br />
              <small>
                <Trans id="shaman.restoration.manaTideTotem.statistic.healerManaRestored">
                  Mana which shield discipline would have returned
                </Trans>
              </small>
            </div>
          </div>
        </BoringValue>
      </Statistic>
    );
  }
}
export default SolaceVsShieldDiscipline;
