import {
  IsPenanceDamageEvent,
  IsPenanceHealEvent,
} from 'analysis/retail/priest/discipline/modules/spells/Helper';
import { formatNumber, formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { DamageEvent, HealEvent } from 'parser/core/Events';
import { Options } from 'parser/core/Module';
import { TALENTS_PRIEST } from 'common/TALENTS';
import Penance from './Penance';
import AtonementAnalyzer, { AtonementAnalyzerEvent } from '../core/AtonementAnalyzer';
import Statistic from 'parser/ui/Statistic';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemHealingDone from 'parser/ui/ItemHealingDone';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

interface DirtyDamageEvent extends DamageEvent {
  penanceBoltNumber?: number;
}

class Castigation extends Analyzer {
  static dependencies = {
    penance: Penance, // we need this to add `penanceBoltNumber` to the damage and heal events
  };

  healing = 0;
  damage = 0;

  _isCastigationBolt = false;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(TALENTS_PRIEST.CASTIGATION_TALENT);
    this.addEventListener(Events.damage.by(SELECTED_PLAYER), this.onDamage);
    this.addEventListener(Events.heal.by(SELECTED_PLAYER), this.onHeal);
    this.addEventListener(AtonementAnalyzer.atonementEventFilter, this.onAtone);
  }

  onDamage(event: DamageEvent) {
    if (!IsPenanceDamageEvent(event)) {
      return;
    }

    if (event.ability.guid !== SPELLS.PENANCE.id || event.penanceBoltNumber !== 3) {
      this._isCastigationBolt = false;
      return;
    }

    this._isCastigationBolt = true;
    this.damage += event.amount;
  }

  onHeal(event: HealEvent) {
    if (!IsPenanceHealEvent(event)) {
      return;
    }

    const spellId = event.ability.guid;

    // Friendly Penance Healing
    if (spellId === SPELLS.PENANCE_HEAL.id) {
      if (event.penanceBoltNumber === 3) {
        this.healing += event.amount;
      }
    }
  }

  onAtone(event: AtonementAnalyzerEvent) {
    if (event.damageEvent?.ability.guid !== SPELLS.PENANCE.id) {
      return;
    }
    const { penanceBoltNumber } = event.damageEvent as DirtyDamageEvent;
    if (penanceBoltNumber !== 3) {
      return;
    }
    if (this._isCastigationBolt) {
      this.healing += event.healEvent.amount;
    }
  }

  statistic() {
    const healing = this.healing || 0;
    const damage = this.damage || 0;

    return (
      <Statistic
        size="flexible"
        category={STATISTIC_CATEGORY.TALENTS}
        position={STATISTIC_ORDER.CORE(4)}
        tooltip={
          <>
            {' '}
            The effective healing contributed by Castigation (
            {formatPercentage(this.owner.getPercentageOfTotalHealingDone(healing))}% of total
            healing done). Castigation also contributed{' '}
            {formatNumber((damage / this.owner.fightDuration) * 1000)} DPS (
            {formatPercentage(this.owner.getPercentageOfTotalDamageDone(damage))}% of total damage
            done), the healing gain of this damage was included in the shown numbers.
          </>
        }
      >
        <BoringSpellValueText spellId={TALENTS_PRIEST.CASTIGATION_TALENT.id}>
          <ItemHealingDone amount={healing} />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default Castigation;
