import { ClientComponent } from "./client/client.component";
import { ColectionComponent } from "./colection/colection.component";
import { GroupComponent } from "./group/group.component";
import { ProdutoComponent } from "./produto/produto.component";
import { SubGrupoComponent } from "./sub-grupo/sub-grupo.component";
import { UserComponent } from "./user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupos',
        icon : 'assessment',
        component: GroupComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
    },
    {
        path: 'subGroup',
        caption : 'Sub-Grupo',
        icon : 'equalizer',
        component: SubGrupoComponent,
    }
    ,
    {
        path: 'colection',
        caption : 'Coleção',
        icon : 'card_giftcard',
        component: ColectionComponent,
    }
    ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'accessibility_new',
        component: ClientComponent,
    }
    ,
    {
        path: 'product',
        caption : 'Produto',
        icon : 'shop',
        component: ProdutoComponent,
    }

]