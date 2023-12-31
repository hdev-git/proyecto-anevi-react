PGDMP                         {            Bnzero    14.6    14.6 D    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    24578    Bnzero    DATABASE     l   CREATE DATABASE "Bnzero" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Latin America.1252';
    DROP DATABASE "Bnzero";
                postgres    false            �            1259    24579    Category    TABLE     �  CREATE TABLE public."Category" (
    id integer NOT NULL,
    "serviceName" character varying NOT NULL,
    "subServiceName" character varying,
    "serviceVariable" character varying NOT NULL,
    "fixedPriceX" character varying,
    "variablePriceY" character varying,
    quantity character varying NOT NULL,
    "fixedPrice" character varying,
    "variablePrice" character varying,
    discount integer,
    "fullPrice" character varying,
    "paymentsDistribution" character varying
);
    DROP TABLE public."Category";
       public         heap    postgres    false            �            1259    24584    Category_id_seq    SEQUENCE     �   ALTER TABLE public."Category" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    24585    Clients    TABLE     �  CREATE TABLE public."Clients" (
    id integer NOT NULL,
    "firstName" character varying,
    "secundName" character varying,
    "firstLastName" character varying,
    "SecundLastName" character varying,
    phone character varying,
    website character varying,
    "idHubPost" integer,
    "imageProfile" character varying,
    company character varying,
    email character varying,
    "dateCreate" timestamp with time zone,
    reference character varying,
    review character varying
);
    DROP TABLE public."Clients";
       public         heap    postgres    false            �            1259    24590    Clients_id_seq    SEQUENCE     �   ALTER TABLE public."Clients" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Clients_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            �            1259    24591    Concept    TABLE     q   CREATE TABLE public."Concept" (
    id integer NOT NULL,
    "productId" integer,
    title character varying
);
    DROP TABLE public."Concept";
       public         heap    postgres    false            �            1259    24596    Concept_id_seq    SEQUENCE     �   ALTER TABLE public."Concept" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Concept_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            �            1259    24597    Fees    TABLE     �   CREATE TABLE public."Fees" (
    id integer NOT NULL,
    data character varying,
    "clientId" integer,
    "projectId" integer,
    "quoteId" integer
);
    DROP TABLE public."Fees";
       public         heap    postgres    false            �            1259    24602    Fees_id_seq    SEQUENCE     �   ALTER TABLE public."Fees" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Fees_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    24603    Products    TABLE     P  CREATE TABLE public."Products" (
    id integer NOT NULL,
    ref character varying NOT NULL,
    price character varying NOT NULL,
    amount character varying NOT NULL,
    duration character varying NOT NULL,
    facturation character varying NOT NULL,
    concept character varying NOT NULL,
    title character varying NOT NULL
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    24608    Products_id_seq    SEQUENCE     �   ALTER TABLE public."Products" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    24609    Projects    TABLE     )  CREATE TABLE public."Projects" (
    id integer NOT NULL,
    "clientId" integer,
    "contactId" integer,
    reference character varying,
    review character varying,
    title character varying,
    m2 character varying,
    location character varying,
    description text,
    scope text
);
    DROP TABLE public."Projects";
       public         heap    postgres    false            �            1259    24614    Projects_id_seq    SEQUENCE     �   ALTER TABLE public."Projects" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Projects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    24615    Quotes    TABLE       CREATE TABLE public."Quotes" (
    id integer NOT NULL,
    title character varying(100),
    "hubspotOwnerId" integer,
    terms character varying(1000),
    "quoteNumber" character varying(100),
    "quoteAmount" integer,
    status character varying(2),
    "createDate" timestamp with time zone,
    "expirationDate" timestamp with time zone,
    "idClient" integer,
    "projectId" integer,
    price character varying,
    reference character varying,
    scope character varying,
    "clientId" integer
);
    DROP TABLE public."Quotes";
       public         heap    postgres    false            �            1259    24620    Quotes_id_seq    SEQUENCE     �   ALTER TABLE public."Quotes" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Quotes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    24621    Role    TABLE     ^   CREATE TABLE public."Role" (
    id integer NOT NULL,
    title character varying NOT NULL
);
    DROP TABLE public."Role";
       public         heap    postgres    false            �            1259    24672    Scope    TABLE     �   CREATE TABLE public."Scope" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    title character varying NOT NULL
);
    DROP TABLE public."Scope";
       public         heap    postgres    false            �            1259    24671    Scope_id_seq    SEQUENCE     �   ALTER TABLE public."Scope" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Scope_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232            �            1259    24626    SubCategory    TABLE       CREATE TABLE public."SubCategory" (
    id integer NOT NULL,
    "nameSubService" character varying NOT NULL,
    "fixedPrice" character varying,
    "variablePrice" character varying,
    quantity integer NOT NULL,
    "fullPrice" character varying NOT NULL
);
 !   DROP TABLE public."SubCategory";
       public         heap    postgres    false            �            1259    24631    SubCategory_id_seq    SEQUENCE     �   ALTER TABLE public."SubCategory" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."SubCategory_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    24632    TermsAndConditions    TABLE     �   CREATE TABLE public."TermsAndConditions" (
    id integer NOT NULL,
    "idOrder" integer NOT NULL,
    description character varying NOT NULL
);
 (   DROP TABLE public."TermsAndConditions";
       public         heap    postgres    false            �            1259    24637    TermsAndConditions_id_seq    SEQUENCE     �   ALTER TABLE public."TermsAndConditions" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TermsAndConditions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    24638    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    "userName" character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(200) NOT NULL,
    "firstName" character varying(30) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    role integer NOT NULL,
    "accountBlocking" boolean,
    "reasonBlocking" text,
    "dateCreate" timestamp with time zone,
    "dateBlocking" timestamp with time zone
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    24643    Users_id_seq    SEQUENCE     �   ALTER TABLE public."Users" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    24680    coverPhotoPdf    TABLE     �   CREATE TABLE public."coverPhotoPdf" (
    id integer NOT NULL,
    url character varying NOT NULL,
    active boolean DEFAULT true
);
 #   DROP TABLE public."coverPhotoPdf";
       public         heap    postgres    false            �            1259    24679    coverPhotoPdf_id_seq    SEQUENCE     �   ALTER TABLE public."coverPhotoPdf" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."coverPhotoPdf_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �            1259    24644    secuencia_id    SEQUENCE     u   CREATE SEQUENCE public.secuencia_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.secuencia_id;
       public          postgres    false            <          0    24579    Category 
   TABLE DATA           �   COPY public."Category" (id, "serviceName", "subServiceName", "serviceVariable", "fixedPriceX", "variablePriceY", quantity, "fixedPrice", "variablePrice", discount, "fullPrice", "paymentsDistribution") FROM stdin;
    public          postgres    false    209   �Q       >          0    24585    Clients 
   TABLE DATA           �   COPY public."Clients" (id, "firstName", "secundName", "firstLastName", "SecundLastName", phone, website, "idHubPost", "imageProfile", company, email, "dateCreate", reference, review) FROM stdin;
    public          postgres    false    211   �Q       @          0    24591    Concept 
   TABLE DATA           ;   COPY public."Concept" (id, "productId", title) FROM stdin;
    public          postgres    false    213   }�       B          0    24597    Fees 
   TABLE DATA           N   COPY public."Fees" (id, data, "clientId", "projectId", "quoteId") FROM stdin;
    public          postgres    false    215   A�       D          0    24603    Products 
   TABLE DATA           c   COPY public."Products" (id, ref, price, amount, duration, facturation, concept, title) FROM stdin;
    public          postgres    false    217   =�       F          0    24609    Projects 
   TABLE DATA           }   COPY public."Projects" (id, "clientId", "contactId", reference, review, title, m2, location, description, scope) FROM stdin;
    public          postgres    false    219   (�       H          0    24615    Quotes 
   TABLE DATA           �   COPY public."Quotes" (id, title, "hubspotOwnerId", terms, "quoteNumber", "quoteAmount", status, "createDate", "expirationDate", "idClient", "projectId", price, reference, scope, "clientId") FROM stdin;
    public          postgres    false    221   ��       J          0    24621    Role 
   TABLE DATA           +   COPY public."Role" (id, title) FROM stdin;
    public          postgres    false    223   ��       S          0    24672    Scope 
   TABLE DATA           9   COPY public."Scope" (id, "productId", title) FROM stdin;
    public          postgres    false    232   5�       K          0    24626    SubCategory 
   TABLE DATA           s   COPY public."SubCategory" (id, "nameSubService", "fixedPrice", "variablePrice", quantity, "fullPrice") FROM stdin;
    public          postgres    false    224   f�       M          0    24632    TermsAndConditions 
   TABLE DATA           J   COPY public."TermsAndConditions" (id, "idOrder", description) FROM stdin;
    public          postgres    false    226   ��       O          0    24638    Users 
   TABLE DATA           �   COPY public."Users" (id, "userName", email, password, "firstName", "lastName", role, "accountBlocking", "reasonBlocking", "dateCreate", "dateBlocking") FROM stdin;
    public          postgres    false    228   h�       U          0    24680    coverPhotoPdf 
   TABLE DATA           :   COPY public."coverPhotoPdf" (id, url, active) FROM stdin;
    public          postgres    false    234   ��       \           0    0    Category_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);
          public          postgres    false    210            ]           0    0    Clients_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Clients_id_seq"', 930, true);
          public          postgres    false    212            ^           0    0    Concept_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Concept_id_seq"', 10, true);
          public          postgres    false    214            _           0    0    Fees_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Fees_id_seq"', 2, true);
          public          postgres    false    216            `           0    0    Products_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Products_id_seq"', 5, true);
          public          postgres    false    218            a           0    0    Projects_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Projects_id_seq"', 1, true);
          public          postgres    false    220            b           0    0    Quotes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Quotes_id_seq"', 1, true);
          public          postgres    false    222            c           0    0    Scope_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Scope_id_seq"', 1, true);
          public          postgres    false    231            d           0    0    SubCategory_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."SubCategory_id_seq"', 1, false);
          public          postgres    false    225            e           0    0    TermsAndConditions_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."TermsAndConditions_id_seq"', 12, true);
          public          postgres    false    227            f           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);
          public          postgres    false    229            g           0    0    coverPhotoPdf_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."coverPhotoPdf_id_seq"', 15, true);
          public          postgres    false    233            h           0    0    secuencia_id    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.secuencia_id', 1, false);
          public          postgres    false    230            �           2606    24646    Category Category_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            postgres    false    209            �           2606    24648    Clients Clients_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Clients" DROP CONSTRAINT "Clients_pkey";
       public            postgres    false    211            �           2606    24650    Concept Concept_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Concept"
    ADD CONSTRAINT "Concept_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Concept" DROP CONSTRAINT "Concept_pkey";
       public            postgres    false    213            �           2606    24652    Fees Fees_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Fees"
    ADD CONSTRAINT "Fees_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Fees" DROP CONSTRAINT "Fees_pkey";
       public            postgres    false    215            �           2606    24654    Products Products_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    217            �           2606    24656    Projects Projects_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Projects" DROP CONSTRAINT "Projects_pkey";
       public            postgres    false    219            �           2606    24658    Quotes Quotes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Quotes"
    ADD CONSTRAINT "Quotes_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Quotes" DROP CONSTRAINT "Quotes_pkey";
       public            postgres    false    221            �           2606    24660    Role Role_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            postgres    false    223            �           2606    24678    Scope Scope_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Scope"
    ADD CONSTRAINT "Scope_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Scope" DROP CONSTRAINT "Scope_pkey";
       public            postgres    false    232            �           2606    24662    SubCategory SubCategory_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."SubCategory"
    ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."SubCategory" DROP CONSTRAINT "SubCategory_pkey";
       public            postgres    false    224            �           2606    24664    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    228            �           2606    24666 *   TermsAndConditions termsandconditions_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."TermsAndConditions"
    ADD CONSTRAINT termsandconditions_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."TermsAndConditions" DROP CONSTRAINT termsandconditions_pkey;
       public            postgres    false    226            <      x������ � �      >      x���I��8�.x��v�yA����w�-3=2�ã#�J�H
H����-�������9�au�CI�Z��e�ר 6#��Tw�;�� (t��_|�mN���ŏ����j�=Ѳ)��z���7�����YI����qH��.ݟv�{�𧏴(�����69N��CJ��]K�C�|��w��C��r��_�Oy�����M\5�p񁵴���=k+Z,?�u8|����F���ZV�9m���Ҿ&yZW9��?�_�`�y�|du����"���׿��O��7��َ� �@
��_)���w��/E	�@�y��L^��W�']N��oX�W�o�`U�Wt����C�p�_i���]W�9�8?2����W�^wyM�U�Ϲ^/޳"o��%g]j��%޷|��]^�� ����➶	|\��0��`r09�f(��z�{�TC�0����-�$~I�u_÷?
l�Cmn�`\�j(L6���g&wOG+��C�\9HhrI��O�z��77D�u���h�Bh;4����*k_��	&UV�ia�	�g.��Y��i⫺|��,��8?��mV�!�o�PR��o�U������f��Gʋ3]�i��Z��:�����]���m�z�	�N��G�q��_��ƍ�����$Ab�g�GSo8�?�Y-@8u[�3�u|1F�_i��efcn֋'�m�^�d���Ñ�t}ާ�S^�<6��b?}�K8��X��δe�f�+��CQ'(i�S˦��f��B���M	G=�-��2������վ&�M��ڞ��x7X%��Zc�.4^��<!&��f�[�8���@�Bp�Z�!�qv�����~n��fC��bf_�n���1���X�p�tdy�?l�����(�ͧ��OG ��R]fl�Xm&%@K�֟e��.�8��y�A����c�.��Om��(K('�N8NҺ`�'|xk[oW�����a/i�%KƉ<��� �;��7�v�����W���:��6�M/P�d9���&��Z��������pۍ^B�V|7���̔L8HBb��3�F�3�ğ��ŷ<��DaN���N��9��o��|%β�e)죊���}>�o��r�����r��u�\�GA�\�H�x�:�۝���������P�./�\��(�J�p�I~L����|j�P��K�(I�
D��&���/҇�Z�u$����G'��T^��D=��g&K�W;��,b�B�ka�p��<�����J+�|?��,�G�㘝��r௅w|��/���Q�UJ[^�]C
v�B���P��ڒV�\T%�*�f����*ԑU���ب5v�h�������]�X���az�����5�������/i/G	�` 9���M���q�ق-P�Ϝ���?S�����$^Q�09�� r�>���`�\���y~�V�� �E>tS��JI���a����?�i�6Cj�� R�;�->�Ҍ7�&p+��Gq۔b���]6 t��{�����J~z�&�Q���>��7D���[I�d��j��~�E3��F)S��5*����&�5��K������ʆl.kW�bG�UeoP՞�|r>�'4_�:imN0\Y̌��Uc��
cl��{�d��ң����A%��O�5��c]�h�`Q=a��=��\�����)I%X]`�^Aw�)�hR�gN=���	,���*a�������'�f|�8��wڴ���3��4��g�,c��a�~���W&oc�/񿝺)�3l���(y�E��w�{����͗)g��_�5�M�#;��sN�)
�q�����k�8ya�6E���?8��I�Z�&�����j���xܥM*�H�@i�p�\7ϥ�z���0����gW�� MA8�cx�С�|?��ҙ���L
�7�m�;�K]n����C��5�;e�P�K�i��I7���7E����/ܫ�b�����c�k%���wr�e u�Y�QE4�M�� >�9�!ᶑz���x��|0�:���Un@b���	��w]~�;�\�@�t�(@1�〴�	�|�L�h��ؖ^;��^��%����BjH����F~�R�`AM=�CSS���%19���7��ȼNz�L��
H�wݱ�9|v����6
�m�81~v�$�!g����G��pe_���X{�`��%k-��2��[b�y��A�V.���]9T�gpQ�<G)�q:�hM��	���7�-�'>˯(��Y��##@@����(��#�$D�����6�p/`=���HaA���b�,����8"��.�݆��ϯ�m+B�����̫�
6��p7[7����E�x���n%�� GMc�(^���)+�Z6���^�%�|ƪ$/�̞K��N��i�ŸaSI������]�^||����iJ��"����P��Q�Ӱh����Y��B��=]J�Hw\[��q�vt����q�>6vh��C�5�ԥ��b��mo���\�u!W������cɮ��.P*h*��\-K�`s�9���׿�����JԽ��?��F���P����,Q[�#����4 )�==���g��7M�	)�P��r5|[��"�s�S�Qۛ�n�8c��cS�_1֚ʇ�rh��"!�G�\���N]L�j�����fE��߭C���s�T�y;y��57��Q��9��&��$�,F���&�%�C��@��a�~٤�$�.
:dҩ:�LM~�7�<�Ōs5�-y�[�6`s@y����{X-`��j�H��5]����ˋ$���r^1X��8C4�����k�3�̫�掉�����p*@;�-Fڄa���`���q��������`���ܘ^7���St���t�9�����C��V��y4U��֫�x�	����J�:q8�!�����Z\{F�PP�wO���F�C_��VF�@�-j/D�!���^�{F��d7�wnd$8�����>]�|-MѤq�e��J&��
�ՎǓ@	|���q����A�~�-�n����_�$N�1���|PB�Y� ,�1��욺5yi/8����^�5Ț���>_XR�N��V�� O�9W(ܸ�x�����WEZ�r�T�MX�C1Spg��o���EJx83���H�z��o�6_>�ǂ���o~!Y)5��˼N�OGf��,ӱ"W�w�=�^�	h��Ԏ�כ��Mc���pr�帊b_�eL��9uR�Q�z��w��@P# %�R�)�6z`Ws��hr�Z����-�5~beK�)F�ً��#j{f�����:��I�T�+�i ����>�𥇮7��XY�M'�ᔺ�a�E%���sm�����b�p=!C�P�Od\���aF��s�u�x��ä�^�,���6�Pq7&��Q��Z�*.Aƺ���}���_�B6O6�R�������l�<mS��w:�~a��<���*�c�k��l��	6%_�!��p���r��)Qd��w��y,Lv>|�R��m6�M���^C@ܧw|2���H�d�l���cX��`��(X<�4��~���R�x�P�N��ُ">�%)������6x�9�5��5�=[�1�'�wΟ��xx���o�p<5ʬC����@��>O�;h�<I�l{��)a��y���H�{0K��Y��J"/�n��F�T�����`]c����7���x�-NJ�$>Hྪn�	�vr����Q��9wثx
\�`w�P�Iu��E���T��b8�f8����	�AVQ�HI>>̭�;E��'<16�c�3�/X-w�w���f�L�=��yw����~N]�L����B*�_=�/օ�lԖ�t^��HC_@6��F�G��c}M�-����� fK�N)KbQtx�lA�%HB�.���ʝZ�9X�!���}��1H�qB�5.��Ƙ��J0�`����p�r�7`.�ET�Gj��i�pT%�1�/��=arAI�r._�+�{�(1ފQ2t{g}}�� ����R_���j< �ZN@�)(:���wp��D͝��S��<*h���o�a,�?��f�M�
8��ZY��:��:Ay����cZ"    ~f�}hgd�C`�cfmG��>��%�ٿ���}��PR����y<{�kG��p;����:Th0ۭ0}����#�m��nf�b�GMA���T �2zuy��M�����\h/�s�+Ç��y�L*4��W��X&���s*�	(��2�z�#��|/��H�]m6J�ub�tY�J=P1�жʤ��@Y�#,�J�˚i�4
ب˧�&N�킍�ϑ
;��̧1���צO�O<F�7g�n�{Wsa�e���8�[IN>��н��<�pz�w��#9N@ UMej��Z�.�ծB��G���Y9�옻J���R�"*r(K�w-�c�QV���LG��T��yjs���ۥ�7hR�����&��r�&�C�D���T�'�,E�jߟ�κڴ_���)�!ch��fES��^=d,)L�#Cc�1���a�^��5�H	��vE���͙�m��+?�(�X��H��
����@s��L� *-DT�;s�G	$"pd�ޘ�r��R	���Q+��F�s:�a>���1�g5t��ϔ���NE�1����ͤN�=䩴L^�Q;�:#}�(�x��8�j	S��I:1J�}7�]�[K��J{Gs&x��sX�\�3���p�c}ѢNq�PP���U�N�����6�6uS=�	6��`񵮮"F��奶�wv_�Q���K��dk[��������a��G���~NHʊ}^���s߯b�����ﴳB��gSya�\��kI��#�ϟ���y�w+��HC@؟���:<����EJTݢ���fd	��K*R�� ���V�Ef��xk��y��h#��^�&|����*�U�Q�X�#�,:U��m1�'L�v�N��P/~�Iz�%,(��}��@������j�i�{�V��@�0zָ,w�Q�DEB*���Q�"��Ԟ<�P۬��!�a훂���N"�����a!*�h�鲤���g�5�����d�$8k��F}!�	=Q���/�ɿ)��Aw��G���$����Z��
�0�׉�n?�f�h��0�P���\�[ӊ�pፁUЗ��Y��J8r*/�$`���Ljc;����,��'��/����!/2wn�9a�V^!��h�Y�&�����wm~��޲�PH#�c0��w�� ��o$L��l��Z���Y���zRz�;��T�^����-���l�3�C��&�:����~�BF��pPhJ�I�O4ϖ�\a��V�ELY�I�7(�1�������7 ��څ;�|I�;��0��>n��j��o���J����$��N}� .�8 ?������F��Rw�f��>!�񬶼���׃V��v��%0pY|�t+��h�����p[Ԇ���[�5)I�^�d�(j0m��u����e��KݬvV��H����TZ^�2a�m@��d��/E��.��K�z��ꑈT��~�B���*
�z�Ě��.�,�'�,�5&=M��E�I�c�3n���K鬤�������/�b��f2nl�πH8��Ń�ܭi܀9F�Xc�%y�f��5���0�L��;�uՋ��,��Y�q���N���,���6߯8Cf�6�L���p����T)���h��ܹϲ��K���n3���M�ܬg�I�*�P0цbn0���s6��r�|���f6GeW�g2\���~�ӌ�y���f1~�Ӟ�Z�>?�s����a�u<�d!
Ւ��y%�΂��&-�A��c��歒 t���?^���J��5^���G��S1J�q�ֵ�7���|\n,n�9�*/N%�_��!6���_� Xu3(���Ns�O:���lqS_š�2�ɸOAB]���,�kљ�܉/ӯ�[�r��ݤS��̻�44d�j�����ɟ��`��#�q[6^Ø-�݃��N)�=��]�����O� �i?Ђ�g;Ž!��񧻶�g�F�ʬG�8��}�h�x�i��)�ʵ����8�AR��P�&����j��펹`��uVi�߭��2A"6O�C�]����
�
���U�|�\����<ӌ�D�l�d�y_���i��"[��)r�	pXm��T(*�h��/�'�(?� �:A	B�}����Z
����7����n���9���ݵ̫����K�,6,XǑ썶5�M��+���@�P[k�n�S�o�c<�b��֍��\�iq�n���0��ey������:rf�ꔐ�hN����OG��[:`b��l<t�`V�פH��h}	�=e/��G Ki���j2Ai��"��n<����n����	�$1�m܏�㶯�̭�`d���i�u��f&2�ރ>���B�ݪ������Z�\���,�Z������\�[���� I\-��y��k}��.���A%�Q�Gyr�8�4�6hb5U�B��*�'���5m��(�<�2��M��!���	
�^��Qߍ�˦� ����=��mf
$�)f����;��܃8?��y��>H�Ϋ�w��|hx�r��!��x�nܵ��j��䟑�%�J�����2�$�3F�7�`�-aښleڡQ��	.=�c*��{�ά������M��m�q�7��iTd[��[n7�S��ʑ��Y]�c=tl��h�Cc]���4�l���hN�j�����BF~�Wۡ��Ur'�H*3���v�b9Ș	L���ʟ�"�wBR�,p�h��ce����x4pSnN	Z P�zrw,��gy��U��|0�?�&�E�';�2*t�
β�B[Y*	K��o���)߆���:�es��A[�-��9�T׉�Lg�_��X+��o����\g|`<���};0g��;#�1�Լ,��N���d�kX_���}[��8����� À��-]���1[�*7�H��@$9l�Ň���fx��l/�1�����m9���;�)�e��"5L��aw��D���z^��9&��b�����߇����#RY ��l� ��&(�@�a�|sr���0O�+��6���cd�\�$\c�ޙ?�����}��z�}|��8�J)�G]ȹZT��1��0�Inۄ�@i9��t#AT��b讯�e8�?˱^�?m�1�#C9��	"�'�W�-�(��@�X��l� O�	Fb�唠�ג�΋�~I�t��yy�!3֨��
d{b<��:��$���6�n(��t_��\���ǜ/�g�4��D��'�i"��	c����%��~[`��O��^'H�l�Eh��Vh9H��v'�%�+�� Inn�g�_�J �]²� ��6�w]��)�B˱�MsO!|��~���@�l�����@��7�;K6��}��P6���&�� �يi*�؁�ک���S�3߮�^��&
,	��J#��rP�i����}���2�	����i��&�<�4'�#� �#��3'e���g֝ݻ�W~j�0��
� 7��kR�-� ��8
�RW�JT)������)5TN��&�Y����m��9�b����r�{A�p�l0g4��O�a6�q_�R><�.�yM\�4b)�,�����`snbkb�V����o��.K�DyjY�Ȁx�u<p/˛��n�]�X��Ƅ��w�0*)�0�����lΒ�l�'�#JKw�y(t#>֒l��}�h�a���}�_�Y(�J'F�m:�c�[��,�W/v��u�>��
��{tI�~��T��}�T��E�k��U^�\��Zgc�{��+�0>�H/�~,��wRu;��K��3�\D ���/����R?��c���?Z�mb��k`|*?��f�I�?�pc'w��'v����zZkH�����
	#m����Ӊ��%CQ�lB���0tNB�9��)�ҧ�sy�G�t�#'��q�-�.FR4N�Aj�b�5��#'f��d��b��G�|'�Qg5�b�3��,<Ĉ�	���/Yo3R�#^�GIsql��u���:o��Tށ�������w☑[�z��O�,��"���gH�{:����⣃U	R��Q>��q���D�L#�ǘ�@H���7�<H���#Ǘ=�-�Y�;7+�;    ��7�FĬ#�+���e�ln�.>����$�Z.�Ff�tg�)J^�#�C�د�}�����g$doE%�1J���Gǉ����1���7X�?&��$?q$��f�"�2(A��)R��v�p����*�qo�#�a9��j�3��K��p�Zн�ײ�A�C33�n�~�#�G�f�ϺH��"V����*�w�N�s*�AR�,�����R4����09nf��y�g�z���\l~���y��!Y�p8���@ې��Պ�F�N�Ø�5����8;\��
yNG�0 �t�h���Fi�0���MZ�Zn˙�z��(�½��sz��pQ��;�=h-�v#!U�b�AQmK!R�G������L�D+��ţ�G�l���#oY�wv�)=��s�h,�N���&NؖWY�ң�v
I�̃g 𲚁-�N#@/
���/�l��n9Ln,z����]�H[W�e���+8�}�j"�̌A�.�ʡ�k}v�*kD�����E��s�����v�	� 
��q��o��OԌ���p�(���HhYWv�E�0,:��c�\SwG���#�!�i�<:��+pb�Q8�U�[	�Y�h��j��o�pF��}m��
��(�Q��D�귋 !Uz�_��b4��s�Yr�A�C`3/i(H����&�`L���"@��%@���2h�~h%d��-qt5š5\�m60��"0AAS���l�ڙ�ʗ�7^ݭ��Mp�l���|�y���V<�HMxzO�8�����1蘭��ٌT��	��*gR���~�[A����f4���4@z�C��Ж�z˷���H��(��L���8S�J���Z&5��t�]+͹��g��H*�]���U�yU��ςU^[�HcQ0� Awo=����b��Њ,��l�H�nMBl�~��"%[��	��(6_�%��J�riQT;Z�3�#	������� �uFJ����`.$�S���
���=��v�4XɅX�U�� 3@��2���UfW4ޅ�ˍ��t)��{��r���W9���6��HH�t�\O�L�z:��:�NݰH�u�� �i�$~������Fg/v�<z�l��a�Q��S���H���R

2����K�+�>��>ؽr��ME�}��xM��9������)�C�j�$��HGz�e� 
�Ϻ�{{��.t�wXY�Ң���;�;��0��ݡs���� 6�T���!��٨��*ux4�U,]2�1A���{Vعa���K�`:Vs��٘0�B���r8���Co�V6���&)�}�� ,Z��S�=� wJ�z���Q��Xm�Kr��p*�,�8����IJ�2a�=H�1#��pqGe�6@p��ٯ�2ڕ@��<8���$���<�+�!��@t���_E��ʌ�!f=����ڋQL���`{}�5H���ķ�Y��r�'�����S�4lo.r@�߷CU�z=���g&g^��b���D$��!x�I:��r�˺̗t��:D{>�%)�{�Tr^fE��{^9xv^#IHr�|��"]|,�t�{S�p� ����0��ؘcԞ��������p�vOS6�Y�"���v�C�:�+��A~�3om��.V�6Ul^�+&2�c�|�$�bXJi�W���W�-AI�y�9��q8�M����H\�+���J�i*F��η�FDa��p���jT��8���I����5.G^=\�j�3�>��š�*�p�p������|����H=��cC� ��xY�P�L�����g�x�e-ם,`qd�`w�L�N�,���1t��v뫶q�>��-D�
��Y��ӛ)�??�'���S�8����6��$A�u��X5�����tv�����!GgA�l���mk�?�M�NX5X�A'��~�۰�V`*U���[̊G���؜�oK�y��ߘ$ۤ����D݅��8���a�q7�na7��ʣ�V����� �p�/�P��`��9l�����a�s@�A3T��>�|�A����v�����.
��x0N@�4A#��*z���X�,
El9��h��a`���A-�|�Ќ<5�1�LS��N�$����!���?��х��JD�tݮt�u�_�>Y���BE����\�f�	�v_���X؍�w�b�TR�����DVV6-�h�j��Jp~���bl9�.��݄�p��������"ׅxM�Bi�]]0��������z;��|��D�^
�m�P��)�=A�w�`�s��\��?Y�+�}HG*�[��B�s�q��2X���K0�I~���n"��,v*0� ���d�)�?���8=�A�����8�]������γM�{}�ꕻ�+�uk?�P!�#�i&�����hNL�&����.r��ܺ�$��̐@��j�T����A�kT���2.I4�k���N��e�2������q(�w�f�R0����`��=��/~�~��d?� 3�.���ӄ�wQv	�sW����l_^�ۙ�(He����ָ�Q~�O��i����JIA�/��ۄ��X*z)*фA>����`>�`��k-N�qL�g�%rw"�
�ރ��E���>�]޿y.��:����L@�v��`��A;�k�s�;�&0��g�=��|�jbW��`���R����v&���nG�qmMt��Y_������I,�>&8d����d�v���i��;�tg�oD�1U�Z�9$i��B�ঌbySCq;�i�.kG^>�?�$��T�s�V0H��m�d�B�絮�xޛ� 	�\�X�����'�P�+���`��QB�N��ﯴ�G`K�,T>�4�Lb/�'��a��`���[@R_F"2�N"���4��*9/�y�[�d#T�!�2frښG�)�n�?v�w`4�y��"&4E��RW��W6v�T��O����\�k�%�T�i
�8:����S8��4tf�T]�Łw����2s2X|>^����{Kȧ@�k5$}5u�������{��7(&]q�@�H�əՅ���#3�����n��y��!.,�=d��ѝP��vFv3��n���;��&�5��5�񟝢i,����';c�JL�q���7&X��1�A���}�{˽�J^���k9	��̈́���F$l�Z��@73����Cd�`
sWm�aˑ\�4�jk�:{Ae
&r��7�<}|�Ϗy��!�@7 �6�B�B��;���"��闀��LE����KM�S�7��+7��)�S��D�p5YF&�;:���JP
|%UuZI�c%⸶������9��hy��ZNA@��Y�n ΰ*C����W'lMY9@%]��"����Ul_�.yns3�Y�E��p�a2j�LI���w�;��^��y����9	��.��%\�|D��G���E�V�)�Ju�����3�Q�S�=�m1�����ó%�X��!��d�:m[[>(c�p�d��z��J���3�*��+�,<���E�n�Ou��yTW5�q}:�h�])|�>G��F��E�#ߔ,�_��+,�"o	�����̓M�׺�;"AY<KB���,�su�D�N����f����s)p|C��p�g�wy}v�\�0D��u�[�/�r���B�
^�p�|��*o�v��oh��� ?�؄����又C��"o��"��g2]�$P�	�-c�%�;�vb����0	A����^�e6U� ����鼧oJ9uE��&���l�*�Q >*�Vv�ۜ:�4r'�xq^���U>Z-��纐�k[��|lC��Εϑ�u���ݎ
٨�+z]�#A	��p�l�F����PЗ����~�����7r��&�b��we�r�j4/ЅE�G	�w:ܧ�!�l��q!�3;����<s"�E��
h>�]!C���t	0�%���t��+%�{��D���j�ڊ"+�������\N7lB�x����6���u���i&���Q4��ig�s�t|ze�C=T��J�H���K�ͫĳ�4���u��k3����ҹk��2��H*0=�ƝV�    %�k��.�'����	��VCS�-oj�1���o��!	w��SBy]�ZW�եr`_�|��������2���z�g"t�wm��ח��t������:��~����ŧ}m�&|��@4S M>�^���&��	�C EJYu�nEh���qd@cMbm��b�l����������k�,�&p��z�[�uS:�m�Z��vt�����o�nn�W~��ӗ5��L����b��uq�1�yCۅQD��l��Ȯv�R`��t^��&k�P/{B0��K��	$��fq���Y��|��G�*е����{gZ���PG�]�K��_ڞܗ3Jl�̫ �۾s_;����H͢��Z>68V�e�;�P�^޷��D��3e�c;R�J�e� �#�m����<{%��f�Ë
���b�kg3R�q!F�������	m�@ᗰ7��l���4�7`����G&�m�'o2T���B �2�mv��ڙY։-�vhl~�NbT��9%��,��[?:�HI���-��Du./����i���C{�$"�;��Z��(нc��m����kAS���B"�vǠ@7��6�mTs����T��3����꼒���X-	G��]���|�cZ��m����e�Oq�a��|g?+�W��]~CF3���e�ۈ�L{"w����>j{�(�ՠKv�0�CYP������6�(
�Ji�5b���� ݆���M���8�y5�Ӏm���8�]�}�Df�����^��K�uw���zj��Lxl�A@����Op��n�A��0���_��	1�Sz�E�^j�Q�'�Ix@�]���&2kb~����E���T������TT������暸�x�J����P�}N����ܖܮy�7� ꙏ�j�SJ��T�� {Y�SZ�Y��c)��Z��Ѽ0��������W�4$玷���0����k�0T�5b�\�����(��a�ܬ�U��I�;��s�T���ѥ��8R."��7�6@`a��kmy�C���\`>�\.�B]� pem&��{^Ю��籫� ���Y�54���=\��U�C�v�a�!@�47�[�$$��k�ye���S����R4�Is�W���LЯ���F�塇��I����m�¼�R�����bt��`�oՇ��:0�β�u*N@�t�.�o9C�Pw�(xYy�����j������p5������1D��4�_K�ex�x/iHO˛��f"��7�f���I���z����|�	��.
u��s�4��;%���XC�����T����ĬqXs'q2�Ii�ВK:4�m���˄:M×����<�摶�ۈ�H��6؋���ҝ�̥��hwj�C�S��^b�Q�y�Q ?���#�@[ Jt!�i�٣sl~YT%�u@�̙ܺ��������Ù�x���ǒ�#�w��'&}��p�Y��]dw��14�~T��b,���]�ب��/l;4Թ}	�3m��Ĩ�Jok���S��.�dHS���C��	�70>v��3l����o{��X"b��F�u(k=gv�v�������謂���9��V��G�.�b3Qb���l*�3���]��IC���܊QXVں�:|�tG�v9Vb�o��!�}��$�[�3E�~A7*U��2��or9C���`�a�˱Ǵ���n��<Խ�RI�F�il6�;���Ω�9*�'�!X�wE����y�_��<��i�I���K�a=�B}?�V�M���3���`���#��,$Թ� �8w���]��y�g!�:"�%�,$N�Ijvk�zL�iCU��#��r�qJ/Udd�1ɳv���r3|�N�Y�q���-I����Jf��y����02Dn�PB�a0B���(�[��/Wu~�s���Z���V��V�B��ل:� �t;���.� e|����u��cτ7���L�"��\Ld�Y�R�ai�����|m9�����թ�����X��Tk�]�6"��8,T�i���Hrc&D;�����h�b���&��Q`�/���@�g_������Q��3|�%�e�$N��C����1D-jDJ�-l�]q]J��Kn�D�p��4�Qr���\�V�5F�mYwh ���nBN*�.�J��(���۹(R��0�N�����s�ai����0�x�f����O����hr����d'ֻG)ޢ�&��i�b�PC#��/���S�b�k�}޿XK�.C�	b��^рh�;66���!^��xõ�R�fr�֮Okк�*���zW�ƁRg~��`�:�č����M�"VK���!4�r���q��T?�hƼ�qϖ�3��g]��9c+��+=;��v;�� ��_V�� ��J�7�k���RND���(c���l�~wnY,G��}�9�*~���Br����Y�̓XǵJq�%v.����b��<f|�������ؾ��z�Q2�ԕ0���1��T����݉��������]t����`��b�Z���p�G&ڃا�?]E~���j8�x{�{�~�]���Fk�w�˅B�@�G�xB`�Jh�����X��<�PjE@:���ze��ߋV1�����{�<X�A���_-Ɇ��ne���"9��L],�`���{����ewn�y��p�R�˖W��I���v/ir�N������_<#lnV_*ۦ�@��$p ��崳E����å��#h|��ȅ�<Bj��^7��`=Z��K��K�Ꮒ�esS�ba�L)j�:Z��ej�眵��Iy�>����(���h��K��U�.3����z�{Q���{[���aI��H�����"��Zw��4�b��X*��6�l6"�]�Ȃ��|�!�o|��s�� �Q:f�|fv��HJ��|�J�������ˑ�Q�ʚ���f7~'��mK15�	G���!�%o����O���@I`ܡ�+���.�y������c���w��d�;F&��}nE�"x.�tC�q����S�0fsPP]��Q�8I����Y��J��~�$�༗J�-�qRݬ�v����O5�e�G�,41Lؽ���ƂE���� �t��X�6[��hT9�t�
2e���k�a�A2.���Y�m��F��\��`����@Ǽo����E�a���)�3�;ѝY>��3�5���G����HF@�E���p�J���`�M��D�|E[r��C�B^~=���>��p�4 C���p�����9�	[��^� &/��^��t�1@����q�m(�HG=NH�[�)�Ж�&ב�zl�(,���,�2��r�|@�K�w9��?���d�ђ퀽����*�����l�S�!i»����e���~m>��}�d6�]S�y�A�x�z3�*u��BV�D���>V�����+�4:NAg �w�D���]�6����<ϲa�G� "?�q�tޑ�a_��tu�t���Z�%s�ZL����4؟+���}�XR�P/-'����o�5�No���=X��'�-��;X���\�Gŵ�S#k�L�W���&'M{;���>���+�j�rX}�W:8 �|�G`2n�������I��}ͦs�^�������8�0��̢��!�kmy�M���wA4	0�07��6gA��!D:�CXy8���U磍�q��Ҡ�E�_�J����u��S{���K�Өt^�D��p�f�c~��rJ��Q楳�1�W���a�w�qe�b�`�AlS�w8� �U�I���.�t���eȸv�O��4�N�P}���;�h��a�"��yS	�A0¿�M�18o��t���3AA0��٦X���:c�܌�P��/�P������J�V���V���Ä����* �������oB �}�G�4c67U��+I
����]���N3�4jB,�69$.�P\�#���4>D��{��{fV5"X$y��e��Q��,�ܛ:��*������h�b�UW�~|� Jl�`����b    �N�f��#h��mNA���ߔ����$�½�b>�0�	6�Ϗ6LIn�4��C[��H�G�{1:-EC�֌�3o=T�F�8����j+�ȿ��0�)��#�^��־CT�^&a��0�P䞖������|��g?������H�0�+�qd�=�<+x�h�Oت�f��0!�ܦ���C��O6P]�a�r��{��"ۗ�e�_0W�F&�4�r��@I��p�f��&J��N�y�@F)��� �� ��V� 2Zvr�	��hkV��Œ��TK;&5���ܤx���TE�ii�\�;�����hW)�ߏ���x��]ws�F��������99���Ǟ�,�H ��X7��.'$�
� 0�����Ka]P���.e�t�xw�HS'��Ѐ^�W<b<�cr��aat|�T������WEF:�����}����U��[_;�c�d�/���1�7��u&�;vוHG���	)��u6�M�Z��;T!���㞌?��b�Tg��H��e�w�d�K[��/�ăB�F�;�"��DԔ��t�[Z��u���ʦ;]m�㛊����A�9��o�:�e�v瘬'�2��N�����"u�m��� ���9m��<?�ܔ%u�!����'�-X�o��8�|0S$�VpSUkQ�����,��Iozw���7{�����󍁊A^��KM�Ϥ��������ﺈ���O!��$&ұa@�{{AC`g�)�%��{(r�|`�n��I���ނ�a�ѣ����X����,�N���Z��`	�'�q5��[�7�.S*5��	�����z2x���4n� ����'�	���F�=W��4`�z�+5��ʙ���8OU��҃�D�n=!�w�Z�י�چ%��ڥ�����$ Ձ�@&Z�vX�Ǜ�
\�'0o��C���������V6җ�0�m??�&��<C��[�
��D�5rjOLg)��d��k_h|� �\�9)�E.�m�R�x�Z@��%���>Qd��wu!5Y' ���{�2��eA���vk�n��bK��;��!��O#[������l�V�_W��h@��̙ly�z��R�R>:��<\�6R�2��˙ڍ2"�UT�1(�:�:!�z؏^X�WK#Z��)	��vXxS��`�� ⶭ*��Q
#�$�����}M�:Iˎ��f�D�oe�y��&·�ܭ����7>�JV����梔QE����,��t�j�u���AB�7� �s�5�Q�/uR0+�'�O��J[A�]�i�	�"��_a.����Iu��[���W��T
�?l���I�-*�0��w�f6u6^�����H��~��vVю�8 f"iȟ�P��57ܮ�r����Hb�z�|��%=��m�13�=��R'b��.|�i��f������~~7�8���yi��a<�	����/�p��ϩ�o*F'/�m�K}��W+oUΦc���1/�#��Ҽ8c���|9�/�MOD�A�z�-�*�%p�Op����^�ۘ�:��|Je^����%�M.I��o\훇<砻��'���5(���C�"�;���UHǕ���[��Q�؀:Ƹ�Ǜ�L�-V>���ȿ�~�{x��iXw0]4���Y��?��l��o�`b��ݩ�X3t7����`^�8�h���xk��V��JWK�nf�*��y��7�A�Vf��O���Ma�u��"OOpF܉�#���&�	}���+q?�o���;!��D� &��Ց�s��<��lB��X�3�wr�7�[��ǜZ�بs8��t�p�ҧ�-��$�v;a�w�jG�kqc���%� 6�����ڗ�L8g��z3�������b��y��)vE�ƕ�����;�Ÿ�&#����d�;���
P��đ�l��M��p#	n-��T\�+J�
5"��%���Z�cm2g��I�Ɲoa���Znmw��]#�\X� ��݉pǟp����p���'G1K�;�v�n�g���N���k����c{�{ۜ�S��H ߛ������t��b��	$C��b:�������S^|�3Α6�������k2���ٚ��N�9�����V��xl\N�ks�r�|���>��J9%	��i�j�V����X~S�� ��U��X+e#��4�e�N����QGB\{�WXb�}ayz�XE��6'��!!��\�Vz>խ����M�_d-�v���\
��0:�=����q�}�F��Lt��4D�<�z�)b�D]��P����0$:^'��0������~:	�m2�jY�d^'ix�M��0�� ���N�6U���D�V��8��p���#��v���h�7��{�ۏ�x\B_��ԓs
7!���GٸD?�+�����%pSR�C�݂s�a�;\r��f?X�T���(:$�KB�dhoV��-�`cN���bD �d�O����U�ɦ*����AE2�����vadu����WZ��?j��8��<�;zP�8������O��߇��c���O-�*�,>���_�������/3]��9���+��8���U��F���ʍ'��֮x��Go�I���]	���gX�yH RN�1�ڝ͎kBK�q?S0wԢ�4(x����0�˂7����6��Pfj3�r��V��ó��9�ˢ��s��X�$�����F�F�2���U�����-��աw�)�aL��}����0^�h&fU��72�-�򞑄�ԻިѼ�#ؖ�_<��k�ciGksT�PH�%#�\�-�h�DP�/��@Z�)�n��Hw����������l��{���@�7,��������a�#º�ZB��W���ɼ�����wY�T�����-MS7];����5���� RLw�U�����c�����C�jj��F����rz9�s�}-D�>�Mj���ֆ��ც\
���NA4J��c�)����x�ߙ''̺����u���z~i��Vzt�
���jm�-�ST�j���Q��D�k�;���_�(Ǚ�=�F�'�CUW�}���r>
[�Bs�;��vFU!F���oq���N����uh�Jܭ}s)ړ���ʝ�̊����"���4-���P:��h5BBI0���V3�4�nE�m�{��K�]�d
#L���j2Է��Ѥ!C�����{b��g�W����X3�q��Y�ݔ6�P�^��Xa��X�&2�n�/I�9q�����f�^�~,`B5�5���f'�	s'Zouq�zq[��d�/L���L��h����2e�� j9�/�槒3��F�1�ܮ��8�.O^4/�`�z8m��s�T�����\Fs�Q�D��Υm9����0�dV�Wzp_�
]�4��v��^۸�-F���p���'�4���#�뫷��4�O�q���d�VE��$���nd���=A�Af&ڬ�����R���'K�bt.�m�­νL��i�k��PN�E vM��[��h���w�R��zwrP���,���2IBԜ�YF��Μ�9=X"�PQ�L B隩^7�����>��em��4���������Z�I�����E� b��=�Χ	�
�zD4w�F�B�&�"��7+:ڄF)�bf��C+w"�Dƫ>Q�2k�m�⢳(3�nؠN^��bs�U�К�	�H�0~���р�3hc�B�1bQ$�J��#v�7ڮ��1���9�#���9<y�mq�������(Q(,��/��?��S�eʉ�	�۶(�g��n��{���X��^B���/�??��a��� /q�����m4��%��
�������B��t��QY�Ϛ�v�����ր�����vڙ�QE���h��MKX�Ӝk���h��-A���Ca����F�v�����_=�)�U����ڂb��}MK��he$�nc ��.F'z!E�j��D������7;#�4M�Y__n��"l=9������ҍN~~����"�����Qím.*�2+E����.�>�O͝7��u�������tw����^��7�O�������O6��?�w�6?ab� �  �z1��woas�s3�̌�j9����0�Qd�w�d�wV^ْ	�y%HAD.���n��m��X�����j��e4�"Ǔyu�E���lO+y~�]��F����,�L#z{��;#�L�S+4�'-Zlt���͍Gf����0yi��_IBtr����_3\�_jj�Qu �G�1��k�}��xV�'�������h����<�X���䓡SDg�(f�a�F��/���癫��r��9  =���\��) ��Lu'�9q�b��P�op"�A
�Y5�}���&<嗺{�g�D������Z������\�'��|#�s��"&�����e��(؎6�E($ؘo�3�(��*TA�R�h��7Ra__D�Mi��7�*s�����؜}Ν��@g�1�A_>��I����@ښm�v[�Z���K���%��'�re�g���lV��L�q��;'Y2
������c<V��&���#Ǻ�M��̺�;&j�_�iո 3�R�JָL�E�x<M��_�Wii��	����k���H�l�4�3#���[�'����������W�Y̼�����x��V�AҞ�r�j%����-�j�'G`�ǫ�j�[@�H@��9��(\c�3��{k����h�;\YnD�D��f��b�`F|�tYm���ׅa�W��Qw�D�(Hs��rpY�`��ɓ�M���M��X��I�u�,���j��va�Q�1!����#ɍ�NP`��͗F(B����[Yg�#/�h�	/��G$Ml�3�`�B"�QE6v=p��&�,v�n��o^#6�⥓�%�����U��c�,���"�r�WDG�	�S�bsRI�^#�ɹ.z�P�������=l��KF��*��k+�bˏ�f���$��H�M�/��_
z~����M����<��㫍v���p͘���}5��ץg	�
:��)�|���Ux[W��n��=��8��Ӆ���R9��l����	[
�)e���ak����r$Q17�b��WlAf�!�2|�7��(^�@�5��V"5r1�{�����=�$"��fs�o���}j3U
�YL��1Jl���٬�ZV7���3��cxK��Ć1�m�n�5�<���x�ձ_���o���p�ܔ�D1�Q8
�`?ӼuXX)(H i����,>���^���B��W9�0U��6�Cme�Tg4��(��������cxs���6J!Z��2q��ql �?y��p�LBs!���ʼ&�aiγ��脶�YO}�x�Tr�1`}a��L�5� jM�@�l&_k�%��Ժ(%�'z�Т�pW>�m��NnZ9>��-1%���8�6G��S�k��)�Qs�;Z����3t�D8�Y��*�w�p���c�h��7��. n�
o%�'zn�sn5���Z[�JE@�cz���,Z�+Kt����R���&1:<�4�V-��k�y�QDPƬ���~h�^-��j������7�*'`�4��a�V^p��J�|*=ϟ��ǳ]#w�ֿiWPЛ$L4��H=�E�jx�z�o,�� ��7�G>H.n��x�vh��+��|4�/����x� ȲS�Oyi�P%3��E��6��&�7���3�ňZ� I���Z����5�}��i:i.^G����Ⱦ�x��9խ�烤��4Ųg%b�̓�u�G44s��(����QtD�fedd=bR�u=��>z�d:X�1֜X�� Fȍ�B�[o��f��F��}8Zy �Qa�$�a)%���p�l-��)��5��)���*����꠶�=��jӵ�1v���߰�����j-�HA��V�l̌�E��ʮ6'��lp����pF�n����KsV���&������ ���9��N�`/�/���Y�Xa�.�v�����ە� ,��2�X��NC��r�$9��yJ�������?�����o      @   �   x�����0���)��R�;bf��k��m~*��8-B�������$�US�c��q�z<f�D�p�@j'�K f�3�^v}�>`�.{��
��A�2��`�k�Y�T#�+fW�������x������𺥈�.³:J�
Ý�Tl����W���++P���Gc�>Q(�}�(��H�q      B   �   x���1O�0���WD��*�����n�!�UF��s�C��qs;C$~��e׽~k�A*z��tbt �Ӄٰn�$���b%A3h\S�^��'#_��$杘�1�E���(:��j��U@�a��e8�ڣ���� |
�0
Ks���\�ǘ��8�
��F+|D��L/p��Z�#Q�f�W�ʰTR%z	� �+��{\����I�A~��	��\�_�?���[7uc7��m����|      D   �   x�E��N�0���S���j+���$�������8���=n�j��m�}0�]ߛ�c׭ao��`���� K	�R-��-�ī��Ɔ:���
<��Ӝ�FRQ�ƍ|�[��eÜ=w��TJa�4OV��T���D���M����_��.ɜ���P���a4_��7��\Q[���ax�ኲ\�A(1d,8X�����^���ұ�'k�?��m�      F   R   x�3�4¢�4C# Yfhd�P�_��\��`�ihd``�雘R���Z�\�Y�����Z��T�ʙ������
�q��qqq �w�      H   ]   x�3�(ʯLM.�W0�4�� WN##c]C]cC+3+C=3sK]S��jc΢�4C#�Ĝ�ļ�T���ԲT��=... )�:      J   .   x�3�K�KIM�/R�*���/�2B���E�9KS2K��=... ���      S   !   x�3�4�t�IN�KNUH�J�-������� \5�      K      x������ � �      M   �  x��W�n7=�|	`#��$��)VÀ���|�K#
l��E��o|���rL�X^�{�� 20�M���ի�Ys�\$��P��j�2��u����W��d�V}���1�j�)�Pl����=�r,F�-�N�g��\0Β����w�Z�z�&0L�pz���QDV��Y��	�/)�ݤL>�6��T�zE)gr6[��UT"��z��k���3��c5bB�x����Vm�{�KE��^Z3޸�^���q�y�o)k�6:U-�J*c��I�b�3"�����7|ΰ;�F]����I�5����$��ٖ5C}����+<O�vP��^�^[�Zrɴ�3�����ڰz���G�/����|�E����G�?��qbc�ͯ�Rr�Q-�K�S�l�Q}(#��c��T���Yr^0�-G��Qe��U�RF퐯�q8����2>�H$�)n�Ŵ#�Z/7�+�Hr�+�R����Z�6�ͺ����ƃ�fF�R�J��H�Y�ri��Qcq,��5|(_�Te�y0�Ku�=�UX�)/�#ce �m��D��,?2	{G�9|�-��f*r�ba�����c��(N)%�Lɨvt������]Wd��m���Y��/޼��/�� A�~d&������$W��)�8��"������	K&�L��r�}G/���ū��W���H��e���~��'�^�kH��%�åt��pM��$�IX�(!r蓰�-�,���Ϛg�;��O4�����.�!׷0�v�Z��)g�v���P�$�Y��0���{��tx�ϊ.9`��D�(Ñ�2|J���>�F�5�v�g�����B5j��T-)f��Ԯ�v�7�h������d���upI�3R��u�;9 sV%v�=�{�x�<m�U�fN^�Mubª����*�'����q�ǂ����PĂ��Sc1�N�B���VJ��0|��X�g5	-��'D�,������N!m�k�<z�<o�?/���b@T�M�:��G�?~.	�]�� ��0po�q��N��ϐ.�ջA�==i�w>7@�Q��*�������\�gKܓi�3%�Bߔ�
�
(�RpjPGGz.TQ�BT	S���M�G�4 o��!�:��;��������p'2DvCt;5��]���b?|�x�����V�٫n�-�J�g��Ip�#�8$T�}��q�][^�vZ>��T����X�0�,�6�Şz��K��'K�$���scƈcڔ�r2C��֌w�E�b�j���z�@)ZF�-�����5w�����;��Q�w�O�n��L�o��''��u��[��z�ۏ�Y�`��u_4�����,���"ֆ\� �I��vu]���?jx<K���uI�Nw��*�]�V%z����-�ߩ����Bo�>̗��uwc����q��S�:x%���C���Rv@�ю�B���bb�i�����fXq}�<��[��
�W����b���      O   �   x�3�tL����L�鹉�9z����*F�*�*zF��)��e����)�>I�U���^�E�YzI.E�Y����aze��P#!�1g��X��*Y��[������e�b���� �'�      U   8   x�34���/.J�O��I-�/�L.)-J�7437322�01�03�+�K�,����� ` .     