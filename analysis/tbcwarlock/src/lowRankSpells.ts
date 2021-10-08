import * as SPELLS from './SPELLS';

export default {
  [SPELLS.BANISH]: [710],
  [SPELLS.CORRUPTION]: [25311, 11672, 11671, 7648, 6223, 6222, 172],
  [SPELLS.CREATE_FIRESTONE]: [17953, 17952, 17951, 6366],
  [SPELLS.MASTER_FIRESTONE]: [13701, 13700, 13699, 1254],
  [SPELLS.CREATE_HEALTHSTONE]: [11730, 11729, 5699, 6202, 6201],
  [SPELLS.CREATE_SOULSTONE]: [20757, 20756, 20755, 20752, 693],
  [SPELLS.MASTER_SOULSTONE]: [16896, 16895, 16893, 16892, 5232],
  [SPELLS.CREATE_SPELLSTONE]: [17728, 17727, 2362],
  [SPELLS.MASTER_SPELLSTONE]: [13603, 13602, 5522],
  [SPELLS.CURSE_OF_AGONY]: [11713, 11712, 11711, 6217, 1014, 980],
  [SPELLS.CURSE_OF_DOOM]: [603],
  [SPELLS.CURSE_OF_RECKLESSNESS]: [11717, 7659, 7658, 704],
  [SPELLS.CURSE_OF_THE_ELEMENTS]: [11722, 11721, 1490],
  [SPELLS.CURSE_OF_TONGUES]: [1714],
  [SPELLS.CURSE_OF_WEAKNESS]: [27224, 11708, 11707, 7646, 6205, 1108, 702],
  [SPELLS.DEATH_COIL]: [17926, 17925, 6789],
  [SPELLS.DEMON_ARMOR]: [11735, 11734, 11733, 1086, 706],
  [SPELLS.DEMON_SKIN]: [687],
  [SPELLS.DRAIN_LIFE]: [27219, 11700, 11699, 7651, 709, 699, 689],
  [SPELLS.DRAIN_MANA]: [27221, 11704, 11703, 6226, 5138],
  [SPELLS.DRAIN_SOUL]: [11675, 8289, 8288, 1120],
  [SPELLS.ENSLAVE_DEMON]: [11725, 1098],
  [SPELLS.FEAR]: [6213, 5782],
  [SPELLS.FEL_ARMOR]: [28176],
  [SPELLS.HEALTH_FUNNEL]: [11695, 11694, 11693, 3700, 3699, 3698, 755],
  [SPELLS.HELLFIRE]: [11684, 11683, 1949],
  [SPELLS.HOWL_OF_TERROR]: [5484],
  [SPELLS.IMMOLATE]: [25309, 11668, 11667, 11665, 2941, 1094, 707, 348],
  [SPELLS.INCINERATE]: [29722],
  [SPELLS.LIFE_TAP]: [11689, 11688, 11687, 1456, 1455, 1454],
  [SPELLS.RAIN_OF_FIRE]: [11678, 11677, 6219, 5740],
  [SPELLS.SEARING_PAIN]: [27210, 17923, 17922, 17921, 17920, 17919, 5676],
  [SPELLS.SHADOW_BOLT]: [11661, 25307, 11660, 11659, 7641, 1106, 1088, 705, 695, 686],
  [SPELLS.SHADOW_WARD]: [11740, 11739, 6229],
  [SPELLS.SOUL_FIRE]: [27211, 17924, 6353],
};

export const whitelist = {
  [SPELLS.DRAIN_SOUL]: [1120],
};

export interface LowRankSpells {
  [primarySpellId: number]: number[];
}
